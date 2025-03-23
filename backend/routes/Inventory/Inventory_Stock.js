import express from "express";
import DB from "../../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/Inventory_Stock").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("StInventory_Stock").find({}).toArray();
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

router.route("/Inventory_Stock/:id").get(async (req, res) => {
  let db = DB.getDB();
  let result = await db
    .collection("Inventory_Stock")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

//delete data
router.route("/Inventory_Stock/:id").delete(async (req, res) => {
  let db = DB.getDB();
  let data = await db
    .collection("Inventory_Stock")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
  console.log("Data deleted successfully");
});
//errors.itemname || errors.minstock || errors.maxstock || errors.currentStock ||  errors.description || errors.ReorderLevel || errors.month
//insert data
router.route("/Inventory_Stock").post(async (req, res) => {
  let db = DB.getDB();
  let mongoObject = {
    itemname: req.body.itemname,
    minstock: req.body.minstock,
    maxstock : req.body.maxstock ,
    currentStock: req.body.currentStock,
    description: req.body.description,
    ReorderLevel: req.body.ReorderLevel,
    month: req.body.month,
  };
  let data = await db.collection("Inventory_Stock").insertOne(mongoObject);
  res.json(data);
  console.log("Data inserted successfully");
});

//update data
router.route("/Inventory_Stock/:id").put(async (req, res) => {
  let db = DB.getDB();
  

  let mongoObject = {
    $set: {
      itemname: req.body.itemname,
      minstock: req.body.minstock,
      maxstock : req.body.maxstock ,
      currentStock: req.body.currentStock,
      description: req.body.description,
     
    },
  };

  let data = await db
    .collection("Inventory_Stock")
    .updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);
  res.json(data);
  console.log("Data updated successfully");
});

export default router;