import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';

dotenv.config(); // Load .env file

const MONGO_URI = process.env.MONGO_URI || "";

// Create a new MongoClient instance
const CLIENT = new MongoClient(MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Variable to store the database connection
let DB;

const connectToServer = async () => {
  try {
    await CLIENT.connect();  // Establish connection with MongoDB
    DB = CLIENT.db("ImperialCashewsDB");  // Set the database (replace with your DB name)
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

const getDB = () => DB;  // Return the DB connection

export default { connectToServer, getDB };
