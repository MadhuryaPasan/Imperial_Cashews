import express from "express";
import DB from "../../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/quality_iso_sls_check").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("quality_iso_sls_check").find({}).toArray();
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

router.route("/quality_iso_sls_check/:id").get(async (req, res) => {
  let db = DB.getDB();
  let result = await db
    .collection("quality_iso_sls_check")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

//delete data
router.route("/quality_iso_sls_check/:id").delete(async (req, res) => {
  let db = DB.getDB();
  let data = await db
    .collection("quality_iso_sls_check")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
  console.log("Data deleted successfully");
});

//insert data
router.route("/quality_iso_sls_check").post(async (req, res) => {
  let db = DB.getDB();
  const date = new Date(req.body.last_audit_date);

  let mongoObject = {
    batch_id: req.body.batch_id,
    iso_certified: req.body.iso_certified,
    sls_certified: req.body.sls_certified,
    // last_audit_date: req.body.last_audit_date,
    last_audit_date: date.toISOString(),
    next_audit_date: req.body.next_audit_date,
    inspector: req.body.inspector,
    remarks: req.body.remarks
  };
  let data = await db.collection("quality_iso_sls_check").insertOne(mongoObject);
  res.json(data);
  console.log("Data inserted successfully");
});

export default router;