import dotenv from 'dotenv';
import { MongoClient,ServerApiVersion } from 'mongodb';

dotenv.config(); // Load .env file

const MONGO_URI = process.env.MONGO_URI || "";


// Create a new MongoClient
const CLIENT = new MongoClient(MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


let DB;

const connectToServer = ()=>{
    DB=CLIENT.db("test"); //database name
}

const getDB = ()=>DB; //

export default {connectToServer,getDB};