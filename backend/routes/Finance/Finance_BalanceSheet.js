import express from "express";
import DB from "../../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/Finance_BalanceSheet").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("Finance_BalanceSheet").find({}).toArray();
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

router.route("/Finance_BalanceSheet/:id").get(async (req, res) => {
  let db = DB.getDB();
  let result = await db
    .collection("Finance_BalanceSheet")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

//delete data
router.route("/Finance_BalanceSheet/:id").delete(async (req, res) => {
  let db = DB.getDB();
  let data = await db
    .collection("Finance_BalanceSheet")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
  console.log("Data deleted successfully");
});

//insert data
router.route("/Finance_BalanceSheet").post(async (req, res) => {
  let db = DB.getDB();
  let mongoObject = {
    



    month: req.body.month,
  Bank_Balance = req.body.Bank_Balance,
  Inventory_Value = req.body.Inventory_Value,
  Account_Receivable = req.body.Account_Receivable,
  Equipment_Machinery = req.Equipment_Machinery,
  Accounts_Payable = req.body.Accounts_Payable,
  Loan_Payable = req.body.Loan_Payable,
  Taxes_Payable = req.body.Taxes_Payable,
  Owners_Capital = req.body.Owners_Capital,
  Retained_Earnings = req.body.Retained_Earnings,

  };
  let data = await db.collection("Finance_BalanceSheet").insertOne(mongoObject);
  res.json(data);
  console.log("Data inserted successfully");
});

export default router;
