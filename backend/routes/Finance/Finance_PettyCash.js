import express from "express";
import DB from "../../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/Finance_PettyCash").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("Finance_PettyCash").find({}).toArray();
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

router.route("/Finance_PettyCash/:id").get(async (req, res) => {
  let db = DB.getDB();
  let result = await db
    .collection("Finance_PettyCash")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

//delete data
router.route("/Finance_PettyCash/:id").delete(async (req, res) => {
  let db = DB.getDB();
  let data = await db
    .collection("Finance_PettyCash")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
  console.log("Data deleted successfully");
});

//insert data
router.route("/Finance_PettyCash").post(async (req, res) => {
  let db = DB.getDB();
  //  let previous_balance = 0;
  let previousDoc = await db
    .collection("Finance_PettyCash")
    .find()
    .sort({ _id: -1 })
    .limit(1)
    .toArray();

  if (previousDoc.length > 0) {
    let previous_balance = previousDoc[0].current_balance;
    let current_balance = previous_balance - parseFloat(req.body.amount);

    let mongoObject = {
      transaction_date: new Date().toISOString(),
      amount: parseFloat(req.body.amount),
      description: req.body.description,
      current_balance: current_balance,
      transaction_type: req.body.transaction_type,
      month: req.body.month,
    };
    let data = await db.collection("Finance_PettyCash").insertOne(mongoObject);
    res.json(data);
    console.log("Data inserted successfully");
  } else {
    console.log("cannot find previous balance");
  }
});

router.route("/Finance_PettyCash/:id").put(async (req, res) => {
  let db = DB.getDB();
console.log("hello")


  let mongoObject = {

    $set:{amount: parseFloat(req.body.amount),
    description: req.body.description,}

  };
  let data = await db.collection("Finance_PettyCash").updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);
  res.json(data);
  console.log("Data updated successfully");
});

export default router;
