//Inventory_Stock



import express from "express";
import DB from "../../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/Inventory_Stock").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("Inventory_Stock").find({}).toArray();
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

router.route("/Inventory_Stock/:id").get(async (req, res) => {
  let db = DB.getDB();
  let result = await db
    .collection("Inventory_Stock")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

//delete data
router.route("/Inventory_Stock/:id").delete(async (req, res) => {
  let db = DB.getDB();
  let data = await db
    .collection("Inventory_Stock")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
  console.log("Data deleted successfully");
});

//insert data
router.route("/Inventory_Stock").post(async (req, res) => {
  let db = DB.getDB();
  const expireDate = new Date(req.body.expireDate);

  let mongoObject = {
   /*1*/ item_name: req.body.item_name,
   /*2*/ min_stock : req.body.min_stock,
   /*3*/ max_stock: req.body.max_stock,
   /*4*/ reorderLevel : req.body.reorderLevel,
   /*5*/ currentStock: req.body.currentStock,
   /*6*/lastUpdateTime : req.body.lastUpdateTime,
   /*7*/ note: req.body.note
  };
  let data = await db.collection("Inventory_Stock").insertOne(mongoObject);
  res.json(data);
  console.log("Data inserted successfully");
});

export default router;


/*

item_name
"Raw Cashew nut"
min_stock
"100KG"
max_stock
"500kg"
ReorderLevel
"50kg"
currentStock
"75kg"
lastUpdateTime
"2025.03.21 - 11.30 AM"
note
"this is all raw cashews" */