import express from "express";
import DB from "../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/read").get(async (req, res) => {
  let db = DB.getDB();
  let result = await db.collection("initialTest").find({}).toArray();
  res.json(result);

});


export default router;