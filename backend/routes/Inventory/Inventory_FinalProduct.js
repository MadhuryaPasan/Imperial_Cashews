//Inventory_FinalProduct



import express from "express";
import DB from "../../connection.js"; // Move up two directories

import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/Inventory_FinalProduct").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("Inventory_FinalProduct").find({}).toArray();
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

router.route("/Inventory_FinalProduct/:id").get(async (req, res) => {
  let db = DB.getDB();
  let result = await db
    .collection("Inventory_FinalProduct")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

//delete data
router.route("/Inventory_FinalProduct/:id").delete(async (req, res) => {
  let db = DB.getDB();
  let data = await db
    .collection("Inventory_FinalProduct")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
  console.log("Data deleted successfully");
});

//insert data
router.route("/Inventory_FinalProduct").post(async (req, res) => {
  let db = DB.getDB();
  let mongoObject = {
    category: req.body.category,
    price: req.body.price,
    weight: req.body.weight,
    manufacturerDate: req.body.manufacturerDate,
    ExpireDate: req.body.ExpireDate,
    PackageCount: req.body.PackageCount

  };
  let data = await db.collection("Inventory_FinalProduct").insertOne(mongoObject);
  res.json(data);
  console.log("Data inserted successfully");
});

export default router;
