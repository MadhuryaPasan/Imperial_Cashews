import express from "express";
import DB from "../../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/quality_raw_material_check").get(async (req, res) => {
  try {
    let db = DB.getDB();
    let result = await db
      .collection("quality_raw_material_check")
      .find({})
      .toArray();
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

    let mongoObject = {
      color_appearance: req.body.color_appearance,
      moisture_content: req.body.moisture_content,
      foreign_matter: req.body.foreign_matter,
      damage_percentage: req.body.damage_percentage,
      size: req.body.size,
      checked_by: {
        name: req.body.checked_by.name,
        _id: ObjectId.isValid(req.body.checked_by._id)
          ? new ObjectId(req.body.checked_by._id) // Convert to ObjectId if valid
          : null, // Handle invalid ObjectId,
      },
      checked_time: new Date(new Date().toISOString()),
      batch: {
        batch_id: req.body.batch.batch_id,
        _id: ObjectId.isValid(req.body.batch._id)
          ? new ObjectId(req.body.batch._id) // Convert to ObjectId if valid
          : null, // Handle invalid ObjectId,,
      },
      supplier: {
        _id: ObjectId.isValid(req.body.supplier._id)
          ? new ObjectId(req.body.supplier._id) // Convert to ObjectId if valid
          : null, // Handle invalid ObjectId,,
        name: req.body.supplier.name,
      },
      quality_percentage: req.body.quality_percentage,
      quality_status: req.body.quality_status,
    };

    let data = await db
      .collection("quality_raw_material_check")
      .insertOne(mongoObject);
    res.json(data);

    console.log(data.insertedId);
    

    let updateInventory = {
          $set: {
            quality_level:{
              raw_quality_id: new ObjectId(data.insertedId),
              quality_percentage : req.body.quality_percentage,
              quality_status : req.body.quality_status,

            }

          },
        };


    if (ObjectId.isValid(req.body.batch._id)) {
      await db
        .collection("Inventory_RawCashews_StockLevel")
        .updateOne({ _id: new ObjectId(req.body.batch._id) }, updateInventory);
    } else {
      console.error("Invalid ObjectId for batch._id");
      res.status(400).json({ error: "Invalid batch._id" });
      return;
    }



    console.log("Data inserted successfully");
    // console.log(mongoObject);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
