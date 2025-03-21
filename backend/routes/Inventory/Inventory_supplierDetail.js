//Inventory_supplierDetail


import express from "express";  
import DB from "../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/Inventory_supplierDetail").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("Inventory_supplierDetail").find({}).toArray();
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

router.route("/Inventory_supplierDetail/:id").get(async (req, res) => {
  let db = DB.getDB();
  let result = await db
    .collection("Inventory_supplierDetail")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

//delete data
router.route("/Inventory_supplierDetail/:id").delete(async (req, res) => {
  let db = DB.getDB();
  let data = await db
    .collection("Inventory_supplierDetail")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
  console.log("Data deleted successfully");
});

//insert data
router.route("/Inventory_supplierDetail").post(async (req, res) => {
  let db = DB.getDB();
  let mongoObject = {
     shopName: req.body.shopName,
     Supplier: req.body.Supplier,
     address:  req.body.address,
     phoneNumber: req.body.phoneNumber,
     SuplierMatirial: req.body.SuplierMatirial
  };
  let data = await db.collection("Inventory_supplierDetail").insertOne(mongoObject);
  res.json(data);
  console.log("Data inserted successfully");
});

export default router;
