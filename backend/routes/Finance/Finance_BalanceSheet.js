import express from "express";
import DB from "../../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/Finance_BalanceSheet").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("Finance_BalanceSheet").find({}).toArray();
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// read data single data
router.route("/Finance_BalanceSheet/:id").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db
      .collection("Finance_BalanceSheet")
      .findOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete data
router.route("/Finance_BalanceSheet/:id").delete(async (req, res) => {
  try {
    let db = DB.getDB();
    let data = await db
      .collection("Finance_BalanceSheet")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(data);
    console.log("Data deleted successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//insert data
router.route("/Finance_BalanceSheet").post(async (req, res) => {
  try {
    let db = DB.getDB();
    const date = new Date(req.body.created_date);

    let mongoObject = {
      created_date: new Date(date.toISOString()),
      equity: {
        capital_invested: parseFloat(req.body.equity.capital_invested),
        retained_earnings: parseFloat(req.body.equity.retained_earnings),
        current_year_profit: parseFloat(req.body.equity.current_year_profit),
      },
      liabilities: {
        salaries_payable: parseFloat(req.body.liabilities.salaries_payable),
        epf_payable: parseFloat(req.body.liabilities.epf_payable),
        other_liabilities: parseFloat(req.body.liabilities.other_liabilities),
      },
      assets: {
        bank_balance: parseFloat(req.body.assets.bank_balance),

        cash_in_hand: parseFloat(req.body.assets.cash_in_hand), //petty cash current balance is = to cash in hand. check the petty cash routes to see hot to get the last doc
        inventory: {
          raw_material_value: parseFloat(
            req.body.assets.inventory.raw_material_value
          ),
          finished_Product_value: parseFloat(
            req.body.assets.inventory.finished_Product_value
          ),
        },
        fixed_assets: {
          vehicles: parseFloat(req.body.assets.fixed_assets.vehicles),
          equipment: parseFloat(req.body.assets.fixed_assets.equipment),
          other: parseFloat(req.body.assets.fixed_assets.other),
          land: parseFloat(req.body.assets.fixed_assets.land),
        },
      },
    };
    let data = await db
      .collection("Finance_BalanceSheet")
      .insertOne(mongoObject);
    res.json(data);
    console.log("Data inserted successfully");
    // console.log(mongoObject);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//auto update data
router.route("/Finance_BalanceSheet_Auto").post(async (req, res) => {
  try {
    console.log("Button clicked on the frontend");
    let db = DB.getDB();

    //test data
    let mongoObject = {
      created_date: new Date(),
      equity: {
        capital_invested: 1000,
        retained_earnings: 400,
        current_year_profit: 5111,
      },
      liabilities: {
        salaries_payable: 700,
        epf_payable: 5000,
        other_liabilities: 600,
      },
      assets: {
        bank_balance: 550000,
        cash_in_hand: 80000,
        inventory: {
          raw_material_value: 5555,
          finished_Product_value: 20000,
        },
        fixed_assets: {
          vehicles: 900,
          equipment: 8000,
          other: 444,
          land: 5000,
        },
      },
    };

    let data = await db
      .collection("Finance_BalanceSheet")
      .insertOne(mongoObject);

    res.status(200).json({ message: "Button click processed successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
