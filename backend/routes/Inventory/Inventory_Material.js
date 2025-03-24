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
  
  try {
    // Create a new date object from the request body
    const dateObj = new Date(req.body.getdate);
    
    // Format date as YYYY.MM.DD
    const formattedDate = formatDateWithDots(dateObj);
    
    let mongoObject = {          
      /*1*/ sellerName: req.body.sellerName,     
      /*2*/ buyerName: req.body.buyerName,     
      /*3*/ materialName: req.body.materialName,     
      /*4*/ quantity: req.body.quantity,     
      /*5*/ getprice: req.body.getprice,     
      /*6*/ inventoryLocation: req.body.inventoryLocation,     
      /*7*/ getDate: formattedgetDate,            
    };   
    
    let data = await db.collection("Inventory_Material").insertOne(mongoObject);   
    res.json(data);   
    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: error.message });
  }
});  

//update data  
router.route("/Inventory_Material/:id").put(async (req, res) => {   
  let db = DB.getDB();
  
  try {
    // Create a new date object from the request body
    const getDate = new Date(req.body.getDate);
    
    // Format date as YYYY.MM.DD
    const formattedgetDate = formattedgetDate(getDate);
    
    // MongoDB requires $set for updates
    let mongoObject = {
      $set: {    
        /*1*/ sellerName: req.body.sellerName,     
        /*2*/ buyerName: req.body.buyerName,     
        /*3*/ materialName: req.body.materialName,     
        /*4*/ quantity: req.body.quantity,     
        /*5*/ getprice: req.body.getprice,     
        /*6*/ inventoryLocation: req.body.inventoryLocation,     
        /*7*/ getDate:formattedgetDate,      
      },   
    };    
    
    let data = await db
      .collection("Inventory_Material")
      .updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);
      
    res.json(data);   
    console.log("Data updated successfully");
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: error.message });
  }
}); 

// Helper function to format dates as YYYY.MM.DD
function formatDateWithDots(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}
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