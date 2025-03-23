//Inventory_supplierDetail


import express from "express";
import DB from "../../connection.js"; // Move up two directories

import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/Inventory_supplierDetail").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("Inventory_supplierDetail").find({}).toArray();
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

router.route("/Inventory_supplierDetail/:id").get(async (req, res) => {
  let db = DB.getDB();
  let result = await db
    .collection("Inventory_supplierDetail")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

//delete data
router.route("/Inventory_supplierDetail/:id").delete(async (req, res) => {
  let db = DB.getDB();
  let data = await db
    .collection("Inventory_supplierDetail")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
  console.log("Data deleted successfully");
});

//insert data
router.route("/Inventory_supplierDetail").post(async (req, res) => {
  let db = DB.getDB();
  let mongoObject = {
    /*1*/ address: req.body.address,
    /*2*/ supplierName: req.body.supplierName,
    /*3*/ phoneNumber1: parseInt(req.body.phoneNumber1),
    /*4*/ phoneNumber2: parseInt(req.body.phoneNumber2),
    /*5*/ email: req.body.email,                  
    /*6*/  supplierMaterial: req.body.supplierMaterial,  
    /*7*/  leadTime: req.body.leadTime

  };
  let data = await db.collection("Inventory_supplierDetail").insertOne(mongoObject);
  res.json(data);
  console.log("Data inserted successfully");
});

//update data 
router.route("/Inventory_supplierDetail/:id").put(async (req, res) => {
  let db = DB.getDB();
  

  let mongoObject = {
    $set: {
     /*1*/ address: req.body.address,
    /*2*/ supplierName: req.body.supplierName,
    /*3*/ phoneNumber1: parseInt(req.body.phoneNumber1),
    /*4*/ phoneNumber2: parseInt(req.body.phoneNumber2),
    /*5*/ email: req.body.email,                  
    /*6*/  supplierMaterial: req.body.supplierMaterial,  
    /*7*/  leadTime: req.body.leadTime


    },
  };

  let data = await db
    .collection("Inventory_supplierDetail")
    .updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);
  res.json(data);
  console.log("Data updated successfully");
});

export default router;


/*address
" No 123,Kaduwela"
supplierName
"A.s gunalapa"
phoneNumber1
"0963428674"
phoneNumber2
"0702345678"
email
"asgune@gmail.com"
supplierMaterial
"raw cashew"
leadTime
"2"*/