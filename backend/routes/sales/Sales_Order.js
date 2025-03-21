import express from "express";
import DB from "../../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/Sales_Order").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("Sales_Order").find({}).toArray(); // chage collection name
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

router.route("/Sales_Order/:id").get(async (req, res) => {
  let db = DB.getDB();
  let result = await db
    .collection("Sales_Order")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

//delete data
router.route("/Sales_Order/:id").delete(async (req, res) => {
  let db = DB.getDB();
  let data = await db
    .collection("Sales_Order")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
  console.log("Data deleted successfully");
});

//insert data
router.route("/Sales_Order").post(async (req, res) => {
  let db = DB.getDB();
  let mongoObject = {
    order_id: req.body.order_id,
    customer_id: req.body.customer_id,
    order_date: req.body.order_date,
    status: req.body.status,
    total_price: req.body.total_price,
  };
  let data = await db.collection("Sales_Order").insertOne(mongoObject);
  res.json(data);
  console.log("Data inserted successfully");
});

export default router;

//http://localhost:5000/Sales_Order