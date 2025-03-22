import express from "express";
import DB from "../../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/Sales_Customer").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("Sales_Customer").find({}).toArray(); // chage collection name
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

router.route("/Sales_Customer/:id").get(async (req, res) => {
  let db = DB.getDB();
  let result = await db
    .collection("Sales_Customer")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

//delete data
router.route("/Sales_Customer/:id").delete(async (req, res) => {
  let db = DB.getDB();
  let data = await db
    .collection("Sales_Customer")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
  console.log("Data deleted successfully");
});

//insert data
router.route("/Sales_Customer").post(async (req, res) => {
  let db = DB.getDB();
  let mongoObject = {
    name: req.body.name,
    contact_number: req.body.contact_number,
  
    email: req.body.email,
    customer_id: req.body.customer_id,
    address: req.body.address,
    created_date: new Date(new Date().toISOString()),
    orders_count: parseInt(req.body.orders_count),
    total_spent: parseFloat(req.body.total_spent),
  };
  let data = await db.collection("Sales_Customer").insertOne(mongoObject);
  res.json(data);
  console.log("Data inserted successfully");
});

router.route("/Sales_Customer/:id").put(async (req, res) => {
  let db = DB.getDB();
  

  let mongoObject = {
    $set: {
   name: req.body.name,
    contact_number: req.body.contact_number,
    email: req.body.email,
    customer_id: req.body.customer_id,
    address: req.body.address,
    orders_count: parseInt(req.body.orders_count),
    total_spent: parseFloat(req.body.total_spent),
    },
  };

  let data = await db
    .collection("Sales_Customer")
    .updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);
  res.json(data);
  console.log("Data updated successfully");
});


export default router;

//http://localhost:5000/Sales_Customer