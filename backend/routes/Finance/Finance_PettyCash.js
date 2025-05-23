import express from "express";
import DB from "../../connection.js";
import { ObjectId } from "mongodb";

let router = express.Router();

//read data
router.route("/Finance_PettyCash").get(async (req, res) => {
  try {
    let db = DB.getDB();
    if (!db) {
      return res.status(500).json({ error: "Database connection failed" });
    }
    let result = await db.collection("Finance_PettyCash").find({}).toArray();
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// read data single data
router.route("/Finance_PettyCash/:id").get(async (req, res) => {
  try {
    let db = DB.getDB();
    if (!db) {
      return res.status(500).json({ error: "Database connection failed" });
    }
    let result = await db
      .collection("Finance_PettyCash")
      .findOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete data
router.route("/Finance_PettyCash/:id").delete(async (req, res) => {
  try {
    let db = DB.getDB();
    if (!db) {
      return res.status(500).json({ error: "Database connection failed" });
    }
    let data = await db
      .collection("Finance_PettyCash")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(data);
    console.log("Data deleted successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//insert data
router.route("/Finance_PettyCash").post(async (req, res) => {
  try {
    let db = DB.getDB();
    if (!db) {
      return res.status(500).json({ error: "Database connection failed" });
    }

    const date = new Date(req.body.transaction_date);
    let replenishment = 0;
    let expense = 0;

    if (req.body.transaction_type === "Replenishment") {
      replenishment = parseFloat(req.body.replenishment_amount);
    } else if (req.body.transaction_type === "Expenses") {
      expense = parseFloat(req.body.expense_amount);
    }

    // Get the latest document to find current balance
    let lastDoc = await db
      .collection("Finance_PettyCash")
      .find()
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
    let current_balance = lastDoc.length > 0 ? lastDoc[0].current_balance : 0; // Initialize to 0 if no previous documents

    if (req.body.transaction_type === "Replenishment") {
      current_balance += replenishment;
    } else if (req.body.transaction_type === "Expenses") {
      current_balance -= expense;
    }

    let mongoObject = {
      transaction_date: new Date(date.toISOString()),
      description: req.body.description,
      current_balance: current_balance,
      transaction_type: req.body.transaction_type,
      replenishment_amount: replenishment,
      expense_amount: expense,
    };

    let data = await db.collection("Finance_PettyCash").insertOne(mongoObject);
    console.log("PettyCash data inserted successfully");

    // Insert into BankBook only if replenishment
    if (req.body.transaction_type === "Replenishment") {
      let lastBankBookDoc = await db
        .collection("Finance_BankBook")
        .find()
        .sort({ _id: -1 })
        .limit(1)
        .toArray();
      let balance = lastBankBookDoc.length > 0 ? lastBankBookDoc[0].balance : 0;

      balance = parseFloat(balance) + parseFloat(replenishment);

      let mongoObject_BankBook = {
        description: req.body.description, // correct!
        date: new Date(date.toISOString()),
        reference: "PettyCash Replenishment",
        Withdrawals: replenishment,
        Deposits: 0,
        balance: balance, // you can update this similarly
      };
      await db.collection("Finance_BankBook").insertOne(mongoObject_BankBook);
      console.log("BankBook data inserted successfully");
    }
    //-------------------------------------------------------------------------
    // insert into profit and loss if expense
    else if (req.body.transaction_type === "Expenses") {
      let mongoObject = {
        created_date: new Date(date.toISOString()),
        description: req.body.description,
        type: "Expenses",
        amount_revenue: 0,
        amount_expense: expense,
        category: "Petty Cash Expenses",
      };
      await db.collection("Finance_ProfitLoss").insertOne(mongoObject);
    }

    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;

// import express from "express";
// import DB from "../../connection.js";
// import { ObjectId } from "mongodb";

// let router = express.Router();

// //read data
// router.route("/Finance_PettyCash").get(async (req, res) => {
//   try {
//     let db = DB.getDB();
//     let result = await db.collection("Finance_PettyCash").find({}).toArray();
//     res
//       .status(200)
//       .json({ message: "Data retrieved successfully", data: result });
//   } catch (error) {
//     res.status(404).json({
//       error: "Failed to fetch data from database",
//       message: error.message,
//     });
//   }
// });

// // read data single data

// router.route("/Finance_PettyCash/:id").get(async (req, res) => {
//   let db = DB.getDB();
//   let result = await db
//     .collection("Finance_PettyCash")
//     .findOne({ _id: new ObjectId(req.params.id) });
//   res.json(result);
// });

// //delete data
// router.route("/Finance_PettyCash/:id").delete(async (req, res) => {
//   let db = DB.getDB();
//   let data = await db
//     .collection("Finance_PettyCash")
//     .deleteOne({ _id: new ObjectId(req.params.id) });
//   res.json(data);
//   console.log("Data deleted successfully");
// });

// //insert data
// router.route("/Finance_PettyCash").post(async (req, res) => {
//   let db = DB.getDB();

//   let mongoObject = {
//     transaction_date: new Date(new Date().toISOString()),
//     amount: parseFloat(req.body.amount),
//     description: req.body.description,
//     current_balance: 0,
//     transaction_type: req.body.transaction_type,
//     month: req.body.month,
//   };
//   let data = await db.collection("Finance_PettyCash").insertOne(mongoObject);
//   res.json(data);

//   // get all previous doc
//   let allPreviousDoc = await db
//     .collection("Finance_PettyCash")
//     .find()
//     .sort({ _id: 1 })
//     .toArray();

//   // get month first doc
//   let firstDoc = await db
//     .collection("Finance_PettyCash")
//     .find()
//     .sort({ _id: 1 })
//     .limit(1)
//     .toArray();

//   let current_balance = firstDoc[0].current_balance;
//   allPreviousDoc.forEach(async (element) => {
//     console.log(element);
//     console.log(firstDoc[0].transaction_type);
//     if (element.transaction_type === firstDoc[0].transaction_type) {
//       console.log("first");
//     } else {
//       current_balance = current_balance - parseFloat(element.amount);
//       console.log("amount" + current_balance);

//       console.log(element._id);

//       let current_object = {
//         $set: {
//           current_balance: parseFloat(current_balance),
//         },
//       };
//       await db
//         .collection("Finance_PettyCash")
//         .updateOne({ _id: element._id }, current_object);
//     }
//   });
//   console.log("Data inserted successfully");
// });

// router.route("/Finance_PettyCash/:id").put(async (req, res) => {
//   let db = DB.getDB();

//   let mongoObject = {
//     $set: {
//       amount: parseFloat(req.body.amount),
//       description: req.body.description,
//     },
//   };

//   let data = await db
//     .collection("Finance_PettyCash")
//     .updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);
//   res.json(data);

//   // get all previous doc
//   let allPreviousDoc = await db
//     .collection("Finance_PettyCash")
//     .find()
//     .sort({ _id: 1 })
//     .toArray();

//   // get month first doc
//   let firstDoc = await db
//     .collection("Finance_PettyCash")
//     .find()
//     .sort({ _id: 1 })
//     .limit(1)
//     .toArray();

//   let current_balance = firstDoc[0].current_balance;
//   allPreviousDoc.forEach(async (element) => {
//     console.log(element);
//     console.log(firstDoc[0].transaction_type);
//     if (element.transaction_type === firstDoc[0].transaction_type) {
//       console.log("first");
//     } else {
//       current_balance = current_balance - parseFloat(element.amount);
//       console.log("amount" + current_balance);

//       console.log(element._id);

//       let current_object = {
//         $set: {
//           current_balance: parseFloat(current_balance),
//         },
//       };
//       await db
//         .collection("Finance_PettyCash")
//         .updateOne({ _id: element._id }, current_object);
//     }
//   });

//   console.log("Data updated successfully");
// });

// export default router;

//  // ------------------------------------------------------------------

//  let allPreviousDoc = await db
//  .collection("Finance_PettyCash")
//  .find()
//  .sort({ _id: 1 })
//  .toArray();

// let current_balance = 0;
// for (const element of allPreviousDoc) {
//  if (element.transaction_type === "Replenishment") {
//    current_balance = parseFloat(
//      current_balance + element.replenishment_amount
//    );
//  } else if (element.transaction_type === "Expenses") {
//    current_balance = parseFloat(current_balance - element.expense_amount);
//  }

//  let current_object = {
//    $set: {
//      current_balance: current_balance,
//    },
//  };
//  await db
//    .collection("Finance_PettyCash")
//    .updateOne({ _id: element._id }, current_object);
// }
