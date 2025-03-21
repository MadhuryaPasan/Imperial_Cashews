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
  
  let mongoObject = {
    transaction_date: new Date(new Date().toISOString()),
    amount: parseFloat(req.body.amount),
    description: req.body.description,
    current_balance: 0,
    transaction_type: req.body.transaction_type,
    month: req.body.month,
  };
  let data = await db.collection("Finance_PettyCash").insertOne(mongoObject);
  res.json(data);

  // get all previous doc
  let allPreviousDoc = await db
    .collection("Finance_PettyCash")
    .find()
    .sort({ _id: 1 })
    .toArray();

  // get month first doc
  let firstDoc = await db
    .collection("Finance_PettyCash")
    .find()
    .sort({ _id: 1 })
    .limit(1)
    .toArray();
    
    let current_balance = firstDoc[0].current_balance;
  allPreviousDoc.forEach(async(element) => {
    console.log(element);
    console.log(firstDoc[0].transaction_type);
    if (element.transaction_type === firstDoc[0].transaction_type) {
      console.log("first");
    }
    else{
      current_balance = current_balance - parseFloat(element.amount);
      console.log("amount" + current_balance);

      console.log(element._id);

      let current_object = {
          $set: {
            current_balance: parseFloat(current_balance),
          },
        }
        await db.collection("Finance_PettyCash").updateOne({ _id:element._id }, current_object);


    }
  });
  console.log("Data inserted successfully");
});

router.route("/Finance_PettyCash/:id").put(async (req, res) => {
  let db = DB.getDB();
  console.log("hello");

  let mongoObject = {
    $set: {
      amount: parseFloat(req.body.amount),
      description: req.body.description,
    },
  };

  let data = await db
    .collection("Finance_PettyCash")
    .updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);
  res.json(data);
  console.log("Data updated successfully");
});

export default router;
