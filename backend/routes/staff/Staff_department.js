import express from "express";
import DB from "../../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/Staff_department").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("Staff_department").find({}).toArray();
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

router.route("/Staff_department/:id").get(async (req, res) => {
  let db = DB.getDB();
  let result = await db
    .collection("Staff_department")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

//delete data
router.route("/Staff_department/:id").delete(async (req, res) => {
  let db = DB.getDB();
  let data = await db
    .collection("Staff_department")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
  console.log("Data deleted successfully");
});

//insert data
router.route("/Staff_department").post(async (req, res) => {
  let db = DB.getDB();
  let mongoObject = {
    name: req.body.name,
    manager: req.body.manager,
    staffCount: req.body.staffCount,
  };
  let data = await db.collection("Staff_department").insertOne(mongoObject);
  res.json(data);
  console.log("Data inserted successfully");
});

//update data
router.route("/Staff_department/:id").put(async (req, res) => {
  let db = DB.getDB();
  

  let mongoObject = {
    $set: {
        name: req.body.name,
        manager: req.body.manager,
        staffCount: req.body.staffCount,
    },
  };

  let data = await db
    .collection("Staff_department")
    .updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);
  res.json(data);
  console.log("Data updated successfully");
});

export default router;


