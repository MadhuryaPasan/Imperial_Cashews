import express from "express";
import DB from "../../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/quality_raw_material_check").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("quality_raw_material_check").find({}).toArray();
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// read data single data
router.route("/quality_raw_material_check/:id").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db
      .collection("quality_raw_material_check")
      .findOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete data
router.route("/quality_raw_material_check/:id").delete(async (req, res) => {
  try {
    let db = DB.getDB();
    let data = await db
      .collection("quality_raw_material_check")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(data);
    console.log("Data deleted successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//insert data
router.route("/quality_raw_material_check").post(async (req, res) => {
  try {
    let db = DB.getDB();
    const date = new Date(req.body.date);
    let Withdrawals = 0;
    let Deposits = 0;

    if (req.body.type === "Withdrawals") {
      Withdrawals = req.body.amount;
    } else if (req.body.type === "Deposits") {
      Deposits = req.body.amount;
    }

    let mongoObject = {
      description: req.body.description,
      date: new Date(date.toISOString()),
      reference: req.body.reference,
      Withdrawals: parseFloat(Withdrawals),
      Deposits: parseFloat(Deposits),
      balance: req.body.balance,
    };
    let data = await db.collection("quality_raw_material_check").insertOne(mongoObject);
    res.json(data);
    console.log("Data inserted successfully");
    console.log(mongoObject);

    // ------------------------------------------------------------------

    let allPreviousDoc = await db
      .collection("quality_raw_material_check")
      .find()
      .sort({ _id: 1 })
      .toArray();

    let current_balance = 0;
    for (const element of allPreviousDoc) {
      let current_Withdrawals = element.Withdrawals;

      let current_Deposits = element.Deposits;
      if (element.Withdrawals > 0) {
        current_balance = parseFloat(
          (current_balance - current_Withdrawals).toFixed(2)
        );
        
      }
      if (element.Deposits > 0) {
        current_balance = parseFloat(
          (current_balance + current_Deposits).toFixed(2)
        );
        
      }
      

      let current_object = {
        $set: {
          balance: current_balance,
        },
      };
      await db
        .collection("quality_raw_material_check")
        .updateOne({ _id: element._id }, current_object);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
