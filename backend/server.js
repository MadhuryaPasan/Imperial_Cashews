import connection from "./connection.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import initialTestRoute from "./routes/initialTestRoute.js";
import Inventory_FinalProduct from "./routes/Inventory/Inventory_FinalProduct.js";

dotenv.config(); // Load .env file

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

// Apply routes once (No duplicates)
app.use(initialTestRoute);
app.use(Inventory_FinalProduct);


app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
  connection.connectToServer();
});
