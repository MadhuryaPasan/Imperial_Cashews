//Inventory_Stock


import express from "express";
import DB from "../connection.js";
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
  let mongoObject = {

   /*1*/  item_name: req.body.item_name,
    /*2*/ category: req.body.category,
    /*3*/ min_stock: req.body.min_stock,
    /*4*/ max_stock: req.body.max_stock,
    /*5*/ reorderLevel: req.body.reorderLevel,
    /*6*/ currentstock: req.body.currentstock,
    /*7*/ leadTime: req.body.leadTime,
    /*8*/ lastUpdated: req.body.lastUpdated,
  };

  
  let data = await db.collection("Inventory_Stock").insertOne(mongoObject);
  res.json(data);
  console.log("Data inserted successfully");
});

export default router;
