//Inventory_Material


import express from "express";
import DB from "../../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/Inventory_Material").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("Inventory_Material").find({}).toArray();
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

router.route("/Inventory_Material/:id").get(async (req, res) => {
  let db = DB.getDB();
  let result = await db
    .collection("Inventory_Material")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

//delete data
router.route("/Inventory_Material/:id").delete(async (req, res) => {
  let db = DB.getDB();
  let data = await db
    .collection("Inventory_Material")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
  console.log("Data deleted successfully");
});

//insert data
router.route("/Inventory_Material").post(async (req, res) => {
  let db = DB.getDB();
  const expireDate = new Date(req.body.expireDate);

  let mongoObject = {
    
    /*1*/ sellerName:req.body.sellerName,
    /*2*/  buyerName: req.body.buyerName,
    /*3*/  materialName: req.body.materialName,
    /*4*/  quantity: req.body.quantity,
    /*5*/   getprice: parseFloat(req.body.price),
    /*6*/ inventoryLocation: req.body.inventoryLocation,
    /*7*/ getDate: new Date(getDate.toISOString()),
  
    

  };
  let data = await db.collection("Inventory_Material").insertOne(mongoObject);
  res.json(data);
  console.log("Data inserted successfully");
});

export default router;

//Inventory_Material
/*
sellerName
"a.abaya"
buyerName
"b.gunawardhene"
materialName
"raw"
quantity
"5KG"
getPrice
"1000.00"
inventoryLocation
"section 01"
getDate
"2025.02.06"*/