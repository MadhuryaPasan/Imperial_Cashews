import express from "express";
import DB from "../../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/Staff_salary").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("Staff_salary").find({}).toArray();
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

router.route("/Staff_salary/:id").get(async (req, res) => {
  let db = DB.getDB();
  let result = await db
    .collection("Staff_salary")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

//delete data
router.route("/Staff_salary/:id").delete(async (req, res) => {
  let db = DB.getDB();
  let data = await db
    .collection("Staff_salary")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
  console.log("Data deleted successfully");
});

//insert data
router.route("/Staff_salary").post(async (req, res) => {
  let db = DB.getDB();
  let mongoObject = {
    basicSalary: req.body.basicSalary,
    allowances: req.body.allowances,
    epf: req.body.epf,
    etf: req.body.etf,
    totalSalary: req.body.totalSalary,
    month: req.body.month,
    payDate: req.body.payDate,
  };
  let data = await db.collection("Staff_salary").insertOne(mongoObject);
  res.json(data);
  console.log("Data inserted successfully");
});

//update data
router.route("/Staff_salary/:id").put(async (req, res) => {
  let db = DB.getDB();
  

  let mongoObject = {
    $set: {
        basicSalary: req.body.basicSalary,
        allowances: req.body.allowances,
        epf: req.body.epf,
        etf: req.body.etf,
        totalSalary: req.body.totalSalary,
    },
  };

  let data = await db
    .collection("Staff_salary")
    .updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);
  res.json(data);
  console.log("Data updated successfully");
});

export default router;


