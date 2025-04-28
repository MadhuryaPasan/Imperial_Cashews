import express from "express";
import DB from "../../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/Sales_Order").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db
      .collection("Sales_Order")
      .aggregate([
        {
          $lookup: {
            from: "Sales_Customer", // foreign collection name
            localField: "customer_id", // field in Sales_Order
            foreignField: "_id", // field in customers
            as: "customerData",
          },
        },
        {
          $unwind: "$customerData", // to turn array into object
        },
      ])
      .toArray();

    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// read data single data
router.route("/Sales_Order/:id").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db
      .collection("Sales_Order")
      .findOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete data
router.route("/Sales_Order/:id").delete(async (req, res) => {
  try {
    let db = DB.getDB();
    let data = await db
      .collection("Sales_Order")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(data);
    console.log("Data deleted successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Helper function to generate a unique order ID
async function generateUniqueOrderId(db) {
  let unique = false;
  let newOrderId;

  while (!unique) {
    // Generate a random order ID (you can customize the format)
    newOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`; // Example: ORD-123456

    // Check if the generated ID already exists in the database
    const existingOrder = await db
      .collection("Sales_Order")
      .findOne({ oder_id: newOrderId });
    if (!existingOrder) {
      unique = true; // If no existing order is found, the ID is unique
    }
  }

  return newOrderId;
}

//insert data
router.route("/Sales_Order").post(async (req, res) => {
  try {
    let db = DB.getDB();

    // Generate a unique order ID
    const uniqueOrderId = await generateUniqueOrderId(db);

    let mongoObject = {
      customer_id: new ObjectId(req.body.customer_id), // Convert to ObjectId
      order_date: new Date(new Date().toISOString()), // Convert to Date
      status: req.body.status,
      total_price: parseFloat(req.body.total_price),
      oder_details: req.body.oder_details.map((detail) => ({
        product_name: detail.product_name,
        product_id: new ObjectId(detail.product_id), // Convert to ObjectId
        quantity: parseInt(detail.quantity),
        final_price: parseFloat(detail.final_price),
        shop_product_id: detail.shop_product_id,
      })),
      oder_id: uniqueOrderId, // Assign the unique order ID
    };

    // Insert the order into the Sales_Order collection
    let data = await db.collection("Sales_Order").insertOne(mongoObject);

    // Reduce stock_quantity for each product in the order
    for (const detail of req.body.oder_details) {
      await db.collection("Sales_Product").updateOne(
        { _id: new ObjectId(detail.product_id) }, // Match the product by its product_id
        { $inc: { stock_quantity: -parseInt(detail.quantity) } } // Decrease stock_quantity
      );


    }

    res.json(data);
    console.log("Data inserted successfully and stock updated");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
