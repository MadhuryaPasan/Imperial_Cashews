import connection from "./connection.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import initialTestRoute from "./routes/initialTestRoute.js";
import Inventory_FinalProduct from "./routes/Inventory/Inventory_FinalProduct.js";
import Inventory_Stock from "./routes/Inventory/Inventory_Stock.js";
import Inventory_supplierDetail from "./routes/Inventory/Inventory_supplierDetail.js";
import Inventory_processedMaterial from "./routes/Inventory/Inventory_processedMaterial.js";
import   Inventory_RawMaterial  from "./routes/Inventory/Inventory_RawMaterial.js";

dotenv.config(); // Load .env file

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

// Apply routes once (No duplicates)
app.use(initialTestRoute);
app.use(Inventory_FinalProduct);
app.use(Inventory_Stock);
app.use(Inventory_supplierDetail);
app.use(Inventory_processedMaterial);
app.use(Inventory_RawMaterial);

app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
  connection.connectToServer();
});
