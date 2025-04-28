import express from "express";
import DB from "../../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/Staff_Employee").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("Staff_Employee").find({}).toArray();
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// read data single data
router.route("/Staff_Employee/:id").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db
      .collection("Staff_Employee")
      .findOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete data
router.route("/Staff_Employee/:id").delete(async (req, res) => {
  try {
    let db = DB.getDB();
    let data = await db
      .collection("Staff_Employee")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(data);
    console.log("Data deleted successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//insert data
router.route("/Staff_Employee").post(async (req, res) => {
  try {
    let db = DB.getDB();

    const date = new Date(req.body.dateOfbirth);

    let mongoObject = {
      email: req.body.email, // Corrected from res.body.email to req.body.email
      phoneNumber: req.body.phoneNumber, // Corrected
      address: req.body.address, // Corrected
      department: "HR",
      dateJoined: new Date(new Date().toISOString()),
      dateOfbirth: new Date(date.toISOString()),
      designation: req.body.designation, // Corrected
      gender: req.body.gender, // Corrected
      nic: req.body.nic, // Corrected
      name: req.body.name, // Corrected
    };

    let data = await db.collection("Staff_Employee").insertOne(mongoObject);
    res.json(data);
    console.log("Data inserted successfully");
    console.log(mongoObject);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
