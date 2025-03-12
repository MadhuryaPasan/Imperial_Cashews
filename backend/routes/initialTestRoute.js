import express from "express";
import DB from "../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/read").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db.collection("initialTest").find({}).toArray();
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

router.route("/read/:id").get(async (req, res) => {
  let db = DB.getDB();
  let result = await db
    .collection("initialTest")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});



//delete data
router.route("/read/:id").delete(async (req, res) => {
  let db = DB.getDB();
  let data = await db
    .collection("initialTest")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
  console.log("Data deleted successfully");
});

export default router;
