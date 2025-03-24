import express from "express";
import DB from "../../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/Staff_payroll").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("Staff_payroll").find({}).toArray();
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

router.route("/Staff_payroll/:id").get(async (req, res) => {
  let db = DB.getDB();
  let result = await db
    .collection("Staff_payroll")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

//delete data
router.route("/Staff_payroll/:id").delete(async (req, res) => {
  let db = DB.getDB();
  let data = await db
    .collection("Staff_payroll")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
  console.log("Data deleted successfully");
});

//insert data
router.route("/Staff_payroll").post(async (req, res) => {
  let db = DB.getDB();
  let mongoObject = {
    month: req.body.month,
    year: req.body.year,
    totalAllowences: req.body.totalAllowences,
    totalEPF: req.body.totalEPF,
    totalETF: req.body.totalETF,
    totalPayments: req.body.totalPayments,
  };
  let data = await db.collection("Staff_payroll").insertOne(mongoObject);
  res.json(data);
  console.log("Data inserted successfully");
});

//update data
router.route("/Staff_payroll/:id").put(async (req, res) => {
  let db = DB.getDB();
  

  let mongoObject = {
    $set: {
        month: req.body.month,
        year: req.body.year,
        totalAllowences: req.body.totalAllowences,
        totalEPF: req.body.totalEPF,
        totalETF: req.body.totalETF,
        totalPayments: req.body.totalPayments,
    },
  };

  let data = await db
    .collection("Staff_payroll")
    .updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);
  res.json(data);
  console.log("Data updated successfully");
});

export default router;


