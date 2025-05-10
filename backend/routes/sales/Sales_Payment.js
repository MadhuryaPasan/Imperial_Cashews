import express from "express";
import DB from "../../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/Sales_Payment").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("Sales_Payment").find({}).toArray(); // chage collection name
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

router.route("/Sales_Payment/:id").get(async (req, res) => {
  let db = DB.getDB();
  let result = await db
    .collection("Sales_Payment")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

//delete data
router.route("/Sales_Payment/:id").delete(async (req, res) => {
  let db = DB.getDB();
  let data = await db
    .collection("Sales_Payment")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
  console.log("Data deleted successfully");
});

//insert data
router.route("/Sales_Payment").post(async (req, res) => {
  let db = DB.getDB();
  let mongoObject = {
    payment_id: req.body.payment_id,
    customer_id: req.body.customer_id,
    payment_date: new Date(new Date().toISOString()),
    amount_paid: parseFloat(req.body.amount_paid),
    payment_method: req.body.payment_method,

    status: req.body.status,
  };
  let data = await db.collection("Sales_Payment").insertOne(mongoObject);
  res.json(data);
  console.log("Data inserted successfully");
});

router.route("/Sales_Payment/:id").put(async (req, res) => {
  let db = DB.getDB();
  

  let mongoObject = {
    $set: {
      payment_id: req.body.payment_id,
    customer_id: req.body.customer_id,
    amount_paid: parseFloat(req.body.amount_paid),
    payment_method: req.body.payment_method,
    },
  };

  let data = await db
    .collection("Sales_Payment")
    .updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);
  res.json(data);
  console.log("Data updated successfully");
});


export default router;

//http://localhost:5000/Sales_Payment)