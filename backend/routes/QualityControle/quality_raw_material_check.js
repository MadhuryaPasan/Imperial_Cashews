import express from "express";
import DB from "../../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/quality_raw_material_check").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("quality_raw_material_check").find({}).toArray();
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

router.route("/quality_raw_material_check/:id").get(async (req, res) => {
  let db = DB.getDB();
  let result = await db
    .collection("quality_raw_material_check")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

//delete data
router.route("/quality_raw_material_check/:id").delete(async (req, res) => {
  let db = DB.getDB();
  let data = await db
    .collection("quality_raw_material_check")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
  console.log("Data deleted successfully");
});

// insert data
router.route("/quality_raw_material_check").post(async (req, res) => {
  let db = DB.getDB();
  let mongoObject = {
    batch_id: req.body.batch_id,
    supplier_id: req.body.supplier_id,
    material_type: req.body.material_type,
    size_category: req.body.size_category,
    moisture_level: req.body.moisture_level,
    foreign_objects_detected: req.body.foreign_objects_detected,
    color: req.body.color,
    broken_percentage: req.body.broken_percentage,
    checked_by: req.body.checked_by,
    timestamp: req.body.timestamp || new Date()
};

  let data = await db.collection("quality_raw_material_check").insertOne(mongoObject);
  res.json(data);
  console.log("Data inserted successfully");
});

export default router;