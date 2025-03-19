import express from "express";
import DB from "../../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/Staff_Employee").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("Staff_Employee").find({}).toArray();
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
router.route("/Staff_Employee/:id").get(async (req, res) => {
  let db = DB.getDB();
  let result = await db
    .collection("Staff_Employee")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

//delete data
router.route("/Staff_Employee/:id").delete(async (req, res) => {
  let db = DB.getDB();
  let data = await db
    .collection("Staff_Employee")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
  console.log("Data deleted successfully");
});

//insert data
router.route("/Staff_Employee").post(async (req, res) => {
  let db = DB.getDB();
  let mongoObject = {
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    position: req.body.position,
    department: req.body.department,
    dateJoined: req.body.dateJoined,
  };
  let data = await db.collection("Staff_Employee").insertOne(mongoObject);
  res.json(data);
  console.log("Data inserted successfully");
});

//update one data
router.route("/Staff_Employee/id").put(async (req, res) => {
  let db = DB.getDB();
  let mongoObject = {
    $set: {
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      position: req.body.position,
      department: req.body.department,
      dateJoined: req.body.dateJoined,
    }   
  };
  let data = await db.collection("Staff_Employee").updateOne(mongoObject);
  res.json(data);
  console.log("Data inserted successfully");
});

export default router;