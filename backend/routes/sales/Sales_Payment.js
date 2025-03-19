import express from "express";
import DB from "../../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/Sales_Product").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("Sales_Product").find({}).toArray(); // chage collection name
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

router.route("/Sales_Product/:id").get(async (req, res) => {
  let db = DB.getDB();
  let result = await db
    .collection("Sales_Product")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

//delete data
router.route("/Sales_Product/:id").delete(async (req, res) => {
  let db = DB.getDB();
  let data = await db
    .collection("Sales_Product")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
  console.log("Data deleted successfully");
});

//insert data
router.route("/Sales_Product").post(async (req, res) => {
  let db = DB.getDB();
  let mongoObject = {
    name: req.body.name,
    age: req.body.age,
    gpa: req.body.gpa,
    month: req.body.month,
  };
  let data = await db.collection("Sales_Product").insertOne(mongoObject);
  res.json(data);
  console.log("Data inserted successfully");
});

export default router;

//http://localhost:5000/Sales_Product