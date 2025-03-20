import express from "express";
import DB from "../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/read").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("quality_end_product_check").find({}).toArray();
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

router.route("/read/:id").get(async (req, res) => {
  let db = DB.getDB();
  let result = await db
    .collection("quality_end_product_check")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

//delete data
router.route("/read/:id").delete(async (req, res) => {
  let db = DB.getDB();
  let data = await db
    .collection("quality_end_product_check")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
  console.log("Data deleted successfully");
});

//insert data
router.route("/read").post(async (req, res) => {
  let db = DB.getDB();
  let mongoObject = {
    batch_id: req.body.batch_id,
    product_grade: req.body.product_grade,
    color_uniformity: req.body.color_uniformity, 
    taste_test: req.body.taste_test,
    packaging_integrity: req.body.packaging_integrity,
    approved: req.body.approved,
    checked_by: req.body.checked_by,
    timestamp: req.body.timestamp || new Date()
  };
  let data = await db.collection("quality_end_product_check").insertOne(mongoObject);
  res.json(data);
  console.log("Data inserted successfully");
});

export default router;