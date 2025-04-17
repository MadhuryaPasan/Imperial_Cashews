import express from "express";
import DB from "../../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/Inventory_RawCashews_StockLevel").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("Inventory_RawCashews_StockLevel").find({}).toArray();
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// read data single data
router.route("/Inventory_RawCashews_StockLevel/:id").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db
      .collection("Inventory_RawCashews_StockLevel")
      .findOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete data
router.route("/Inventory_RawCashews_StockLevel/:id").delete(async (req, res) => {
  try {
    let db = DB.getDB();
    let data = await db
      .collection("Inventory_RawCashews_StockLevel")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(data);
    console.log("Data deleted successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//insert data
router.route("/Inventory_RawCashews_StockLevel").post(async (req, res) => {
  try {
    let db = DB.getDB();
    const date = new Date(req.body.date);
   

    let mongoObject = {
      description: req.body.description,
      date: new Date(date.toISOString()),
      reference: req.body.reference,
      Withdrawals: parseFloat(Withdrawals),
      Deposits: parseFloat(Deposits),
      balance: req.body.balance,
    };
    let data = await db.collection("Inventory_RawCashews_StockLevel").insertOne(mongoObject);
    res.json(data);
    console.log("Data inserted successfully");
    console.log(mongoObject);

    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
