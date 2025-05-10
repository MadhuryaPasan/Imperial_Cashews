import express from "express";
import DB from "../../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/Sales_Customer").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("Sales_Customer").find({}).toArray();
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// read data single data
router.route("/Sales_Customer/:id").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db
      .collection("Sales_Customer")
      .findOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete data
router.route("/Sales_Customer/:id").delete(async (req, res) => {
  try {
    let db = DB.getDB();
    let data = await db
      .collection("Sales_Customer")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(data);
    console.log("Data deleted successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//insert data
router.route("/Sales_Customer").post(async (req, res) => {
  try {
    let db = DB.getDB();

    let mongoObject = {
      name: req.body.name,
      contact_number: req.body.contact_number,
      email: req.body.email,
      address: req.body.address,
      password: req.body.password,
      country: req.body.country,
      district: req.body.district,
      created_date: new Date(new Date().toISOString()),
    };

    let data = await db.collection("Sales_Customer").insertOne(mongoObject);
    res.json(data);
    console.log("Data inserted successfully");
    console.log(mongoObject);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//update data
router.route("/Sales_Customer/:id").put(async (req, res) => {
  try {
    let db = DB.getDB();

    let mongoObject = {
      $set: {
        name: req.body.name,
        contact_number: req.body.contact_number,
        email: req.body.email,
        address: req.body.address,
        password: req.body.password,
        country: req.body.country,
        district: req.body.district,
      },
    };

    let data = await db
      .collection("Sales_Customer")
      .updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);
    res.json(data);
    console.log("Data updated successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
