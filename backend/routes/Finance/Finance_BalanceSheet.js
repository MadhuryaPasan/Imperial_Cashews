import express from "express";
import DB from "../../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/Finance_BalanceSheet").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("Finance_BalanceSheet").find({}).toArray();
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

router.route("/Finance_BalanceSheet/:id").get(async (req, res) => {
  let db = DB.getDB();
  let result = await db
    .collection("Finance_BalanceSheet")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

//delete data
router.route("/Finance_BalanceSheet/:id").delete(async (req, res) => {
  let db = DB.getDB();
  let data = await db
    .collection("Finance_BalanceSheet")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
  console.log("Data deleted successfully");
});

//insert data
router.route("/Finance_BalanceSheet").post(async (req, res) => {
  let db = DB.getDB();
  let mongoObject = {
    name: req.body.name,
    age: req.body.age,
    gpa: req.body.gpa,
    month: req.body.month,
  };
  let data = await db.collection("Finance_BalanceSheet").insertOne(mongoObject);
  res.json(data);
  console.log("Data inserted successfully");
});

export default router;
