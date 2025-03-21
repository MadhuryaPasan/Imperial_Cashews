//Inventory_RawMaterial


import express from "express";
import DB from "../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/Inventory_RawMaterial").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("Inventory_RawMaterial").find({}).toArray();
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

router.route("/Inventory_RawMaterial/:id").get(async (req, res) => {
  let db = DB.getDB();
  let result = await db
    .collection("Inventory_RawMaterial")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

//delete data
router.route("/Inventory_RawMaterial/:id").delete(async (req, res) => {
  let db = DB.getDB();
  let data = await db
    .collection("Inventory_RawMaterial")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
  console.log("Data deleted successfully");
});

//insert data
router.route("/Inventory_RawMaterial").post(async (req, res) => {
  let db = DB.getDB();
  let mongoObject = {
    getDate: req.body.getDate,
    expireDate: req.body.expireDate,
    buyerName: req.body.buyerName,
    sellerName: req.body.sellerName,
    weight: req.body.weight,
    price: req.body.price,
    location: req.body.location

  };
  let data = await db.collection("Inventory_RawMaterial").insertOne(mongoObject);
  res.json(data);
  console.log("Data inserted successfully");
});

export default router;
