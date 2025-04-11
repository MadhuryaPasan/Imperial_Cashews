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
    date: new Date(new Date().toISOString()),
    description: req.body.description,
    assets: {
      Bank_Balance: parseFloat(req.body.Bank_Balance),
      Inventory_Value: parseFloat(req.body.Inventory_Value),
      Account_Receivable: parseFloat(req.body.Account_Receivable),
      Equipment_Machinery: parseFloat(req.body.Equipment_Machinery),
    },
    Liabilities: {
      Accounts_Payable: parseFloat(req.body.Accounts_Payable),
      Loan_Payable: parseFloat(req.body.Loan_Payable),
      Taxes_Payable: parseFloat(req.body.Taxes_Payable),
    },

    Equity: {
      Owners_Capital: parseFloat(req.body.Owners_Capital),
      Retained_Earnings: parseFloat(req.body.Retained_Earnings),
    },
  };
  console.log(mongoObject);
  let data = await db.collection("Finance_BalanceSheet").insertOne(mongoObject);
  res.json(data);
  console.log("Data inserted successfully");
});



// update
router.route("/Finance_BalanceSheet/:id").put(async (req, res) => {
  let db = DB.getDB();
  

  let mongoObject = {
    $set: {
      description: req.body.description,
      assets: {
        Bank_Balance: parseFloat(req.body.Bank_Balance),
        Inventory_Value: parseFloat(req.body.Inventory_Value),
        Account_Receivable: parseFloat(req.body.Account_Receivable),
        Equipment_Machinery: parseFloat(req.body.Equipment_Machinery),
      },
      Liabilities: {
        Accounts_Payable: parseFloat(req.body.Accounts_Payable),
        Loan_Payable: parseFloat(req.body.Loan_Payable),
        Taxes_Payable: parseFloat(req.body.Taxes_Payable),
      },
  
      Equity: {
        Owners_Capital: parseFloat(req.body.Owners_Capital),
        Retained_Earnings: parseFloat(req.body.Retained_Earnings),
      },
    },
  };

  let data = await db
    .collection("Finance_BalanceSheet")
    .updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);
  res.json(data);
  console.log("Data updated successfully");
});

export default router;






/*

import express from "express";
import DB from "../../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/Finance_BalanceSheet").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("Finance_BalanceSheet").find({}).toArray();
    res.status(200).json({ message: "Data retrieved successfully", data: result });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch data from the database",
      details: error.message,
    });
  }
});

// read single data
router.route("/Finance_BalanceSheet/:id").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db
      .collection("Finance_BalanceSheet")
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!result) {
      return res.status(404).json({
        error: "Not Found",
        message: `No record found with ID: ${req.params.id}`,
      });
    }
    res.status(200).json({ message: "Data retrieved successfully", data: result });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch data",
      details: error.message,
    });
  }
});

//delete data
router.route("/Finance_BalanceSheet/:id").delete(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db
      .collection("Finance_BalanceSheet")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: `No record found to delete with ID: ${req.params.id}`,
      });
    }
    res.status(200).json({ message: "Data deleted successfully", data: result });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to delete data",
      details: error.message,
    });
  }
});

//insert data
router.route("/Finance_BalanceSheet").post(async (req, res) => {
  try {
    let db = DB.getDB();

    let mongoObject = {
      month: req.body.month,
      date: new Date(new Date().toISOString()),
      description: req.body.description,
      assets: {
        Bank_Balance: parseFloat(req.body.Bank_Balance),
        Inventory_Value: parseFloat(req.body.Inventory_Value),
        Account_Receivable: parseFloat(req.body.Account_Receivable),
        Equipment_Machinery: parseFloat(req.body.Equipment_Machinery),
      },
      Liabilities: {
        Accounts_Payable: parseFloat(req.body.Accounts_Payable),
        Loan_Payable: parseFloat(req.body.Loan_Payable),
        Taxes_Payable: parseFloat(req.body.Taxes_Payable),
      },
      Equity: {
        Owners_Capital: parseFloat(req.body.Owners_Capital),
        Retained_Earnings: parseFloat(req.body.Retained_Earnings),
      },
    };
    let result = await db.collection("Finance_BalanceSheet").insertOne(mongoObject);
    res.status(201).json({ message: "Data inserted successfully", data: result });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to insert data",
      details: error.message,
    });
  }
});

// update
router.route("/Finance_BalanceSheet/:id").put(async (req, res) => {
  try {
    let db = DB.getDB();

    let mongoObject = {
      $set: {
        description: req.body.description,
        assets: {
          Bank_Balance: parseFloat(req.body.Bank_Balance),
          Inventory_Value: parseFloat(req.body.Inventory_Value),
          Account_Receivable: parseFloat(req.body.Account_Receivable),
          Equipment_Machinery: parseFloat(req.body.Equipment_Machinery),
        },
        Liabilities: {
          Accounts_Payable: parseFloat(req.body.Accounts_Payable),
          Loan_Payable: parseFloat(req.body.Loan_Payable),
          Taxes_Payable: parseFloat(req.body.Taxes_Payable),
        },
        Equity: {
          Owners_Capital: parseFloat(req.body.Owners_Capital),
          Retained_Earnings: parseFloat(req.body.Retained_Earnings),
        },
      },
    };

    let result = await db
      .collection("Finance_BalanceSheet")
      .updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);
    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: `No record found to update with ID: ${req.params.id}`,
      });
    }
    res.status(200).json({ message: "Data updated successfully", data: result });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to update data",
      details: error.message,
    });
  }
});

export default router;



*/