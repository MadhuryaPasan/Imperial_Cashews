import express from "express";
import DB from "../../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/Inventory_RawCashews_StockLevel").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db
      .collection("Inventory_RawCashews_StockLevel")
      .find({})
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// read data single data
router.route("/Inventory_RawCashews_StockLevel/:id").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db
      .collection("Inventory_RawCashews_StockLevel")
      .findOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete data
router
  .route("/Inventory_RawCashews_StockLevel/:id")
  .delete(async (req, res) => {
    try {
      let db = DB.getDB();
      let data = await db
        .collection("Inventory_RawCashews_StockLevel")
        .deleteOne({ _id: new ObjectId(req.params.id) });
      res.json(data);
      console.log("Data deleted successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

//insert data
router.route("/Inventory_RawCashews_StockLevel").post(async (req, res) => {
  try {
    let db = DB.getDB();

    const date = new Date(req.body.date_received);

    // Generate a unique batch_code
    let isUnique = false;
    let batch_code;
    while (!isUnique) {
      batch_code = `RAWBATCH${Math.floor(100000 + Math.random() * 900000)}`; // Generate a random batch code
      const existing = await db
        .collection("Inventory_RawCashews_StockLevel")
        .findOne({ batch_code });
      if (!existing) {
        isUnique = true; // Ensure the batch_code is unique
      }
    }

    let mongoObject = {
      batch_code: batch_code, // Use the unique batch_code
      date_received: new Date(date.toISOString()),
      unit_price: parseFloat(req.body.unit_price),
      quality_level: {
        raw_quality_id: null, // Set to null as requested
        quality_percentage: parseFloat(0),
        quality_status: req.body.quality_level.quality_status,
      },
      supplier_details: {
        supplier_id: ObjectId.isValid(req.body.supplier_details.supplier_id)
          ? new ObjectId(req.body.supplier_details.supplier_id) // Convert to ObjectId if valid
          : null, // Handle invalid ObjectId
        supplier_name: req.body.supplier_details.supplier_name,
      },
      started_quantity_kg: parseFloat(req.body.started_quantity_kg),
      current_quantity_kg: parseFloat(0),
      total_inventory_stock_level: parseFloat(0),
      total_inventory_stock_value: parseFloat(0),
      location: req.body.location,
    };

    let data = await db.collection("Inventory_RawCashews_StockLevel").insertOne(mongoObject);
    res.json(data);
    console.log("Data inserted successfully");
    // console.log(mongoObject);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
