import express from "express";
import DB from "../../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/Sales_Sales").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("Sales_Sales").find({}).toArray(); // chage collection name
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

router.route("/Sales_Sales/:id").get(async (req, res) => {
  let db = DB.getDB();
  let result = await db
    .collection("Sales_Sales")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

//delete data
router.route("/Sales_Sales/:id").delete(async (req, res) => {
  let db = DB.getDB();
  let data = await db
    .collection("Sales_Sales")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
  console.log("Data deleted successfully");
});

//insert data
router.route("/Sales_Sales").post(async (req, res) => {
  let db = DB.getDB();
  let mongoObject = {
    sales_id: req.body.sales_id,
    customer_id: req.body.customer_id,
    sales_date: req.body.sales_date,
    payment_status: req.body.payment_status,
    sales_status: req.body.sales_status,
    total_amount: parseFloat(req.body.total_amount),
    unit_price: parseFloat(req.body.unit_price),
    quantity: parseInt(req.body.quantity),
  };
  let data = await db.collection("Sales_Sales").insertOne(mongoObject);
  res.json(data);
  console.log("Data inserted successfully");
});

export default router;

//http://localhost:5000/Sales_Sales