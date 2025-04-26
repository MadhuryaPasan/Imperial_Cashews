import express from "express";
import DB from "../../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/Finance_ProfitLoss").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("Finance_ProfitLoss").find({}).toArray();
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// read data single data
router.route("/Finance_ProfitLoss/:id").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db
      .collection("Finance_ProfitLoss")
      .findOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete data
router.route("/Finance_ProfitLoss/:id").delete(async (req, res) => {
  try {
    let db = DB.getDB();
    let data = await db
      .collection("Finance_ProfitLoss")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(data);
    console.log("Data deleted successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//insert data
router.route("/Finance_ProfitLoss").post(async (req, res) => {
  try {
    let db = DB.getDB();
    const date = new Date(req.body.created_date);

    let mongoObject = {
      created_date: new Date(date.toISOString()),
      description: req.body.description,
      type: req.body.type,
      amount: parseFloat( req.body.amount),
      category: req.body.category,
    };
    let data = await db.collection("Finance_ProfitLoss").insertOne(mongoObject);
    res.json(data);
    console.log("Data inserted successfully");
    console.log(mongoObject);


    
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
