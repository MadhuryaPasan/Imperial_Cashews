import express from "express";
import DB from "../../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
// router.route("/Sales_Product").get(async (req, res) => {
//   try {
//     let db = DB.getDB();
//     let result = await db.collection("Sales_Product").find({}).toArray(); // chage collection name
//     res
//       .status(200)
//       .json({ message: "Data retrieved successfully", data: result });
//   } catch (error) {
//     res.status(404).json({
//       error: "Failed to fetch data from database",
//       message: error.message,
//     });
//   }
// });

router.route("/Sales_Product").get(async (req, res) => {
  try {
    let db = DB.getDB();

    // Perform the aggregation with $lookup and $unwind
    // to join Sales_Product with Sales_Product_Categories
    let result = await db
      .collection("Sales_Product")
      .aggregate([
        {
          $lookup: {
            from: "Sales_Product_Categories", // foreign collection name
            localField: "category", // field in Products
            foreignField: "_id", // field in Sales_Product_Categories
            as: "categoryData",
          },
        },
        {
          $unwind: "$categoryData", // to turn array into object
        },
      ])
      .toArray();

    res
      .status(200)
      .json({ message: "Data retrieved successfully", data: result });
  } catch (error) {
    res.status(404).json({
      error: "Failed to fetch data from database",
      message: error.message,
    });
  }
});

// read data single data
// router.route("/Sales_Product/:id").get(async (req, res) => {
//   let db = DB.getDB();
//   let result = await db
//     .collection("Sales_Product")
//     .findOne({ _id: new ObjectId(req.params.id) });
//   res.json(result);
// });

router.route("/Sales_Product/:id").get(async (req, res) => {
  let db = DB.getDB();
  let resultArray  = await db
    .collection("Sales_Product")
    .aggregate([
      {
        $match: { _id: new ObjectId(req.params.id) }, // Filter the specific document
      },
      {
        $lookup: {
          from: "Sales_Product_Categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryData",
        },
      },
      {
        $unwind: "$categoryData",
      },
    ]) .toArray(); // Use toArray to get the result from aggregation

    const result = resultArray[0]; // Get the single document
    res.json(result || {}); // Return empty object if not found;
});

//delete data
router.route("/Sales_Product/:id").delete(async (req, res) => {
  let db = DB.getDB();
  let data = await db
    .collection("Sales_Product")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
  console.log("Data deleted successfully");
});

//insert data
router.route("/Sales_Product").post(async (req, res) => {
  let db = DB.getDB();
  let mongoObject = {
    name: req.body.name,
    product_id: req.body.product_id,
    category: req.body.category,
    created_date: new Date(new Date().toISOString()),
    description: req.body.description,
    image: req.body.image,
    size: parseInt(req.body.size),
    month: req.body.month,
    price_per_unit: parseFloat(req.body.price_per_unit),
    status: req.body.status,
    stock_quantity: parseInt(req.body.stock_quantity),
  };
  let data = await db.collection("Sales_Product").insertOne(mongoObject);
  res.json(data);
  console.log("Data inserted successfully");
});

router.route("/Sales_Product/:id").put(async (req, res) => {
  let db = DB.getDB();

  let mongoObject = {
    $set: {
      name: req.body.name,
      product_id: req.body.product_id,
      category: req.body.category,
      description: req.body.description,
      image: req.body.image,
      size: parseInt(req.body.size),
      month: req.body.month,
      price_per_unit: parseFloat(req.body.price_per_unit),
      status: req.body.status,
      stock_quantity: parseInt(req.body.stock_quantity),
    },
  };

  let data = await db
    .collection("Sales_Product")
    .updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);
  res.json(data);
  console.log("Data updated successfully");
});

export default router;

//http://localhost:5000/Sales_Product

// read data single data
router.route("/Sales_Product_Categories/:id").get(async (req, res) => {
  let db = DB.getDB();
  let result = await db
    .collection("Sales_Product_Categories")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

//read data
router.route("/Sales_Product_Categories").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db
      .collection("Sales_Product_Categories")
      .find({})
      .toArray(); // chage collection name
    res
      .status(200)
      .json({ message: "Data retrieved successfully", data: result });
  } catch (error) {
    res.status(404).json({
      error: "Failed to fetch data from database",
      message: error.message,
    });
  }
});
