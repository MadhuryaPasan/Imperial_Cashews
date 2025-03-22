//Inventory_FinalProduct




import express from "express";
import DB from "../../connection.js"; // Move up two directories

import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/Inventory_FinalProduct").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("Inventory_FinalProduct").find({}).toArray();
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

router.route("/Inventory_FinalProduct/:id").get(async (req, res) => {
  let db = DB.getDB();
  let result = await db
    .collection("Inventory_FinalProduct")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

//delete data
router.route("/Inventory_FinalProduct/:id").delete(async (req, res) => {
  let db = DB.getDB();
  let data = await db
    .collection("Inventory_FinalProduct")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
  console.log("Data deleted successfully");
});

//insert data
router.route("/Inventory_FinalProduct").post(async (req, res) => {
  let db = DB.getDB();
  let mongoObject = {
    /*1*/ category: req.body.category,
    /*2*/ weight: req.body.weight,
    /*3*/ manufacturerDate:  new Date(manufacturerDate.toISOString()),
    /*4*/  ExpireDate : new Date(getDate.toISOString()),
    /*5*/   PackageCount: req.body.PackageCount,                    
    /*6*/  sellprice: parseFloat(req.body.sellprice),

  };
  let data = await db.collection("Inventory_FinalProduct").insertOne(mongoObject);
  res.json(data);
  console.log("Data inserted successfully");
});

export default router;

/*

category
"dried salt dish"
weight
"150g"
manufacturerDate
2025-03-12T18:30:00.000+00:00
ExpireDate
2025-11-30T18:30:00.000+00:00
PackageCount
"150"
sellprice
"500.00"*/
