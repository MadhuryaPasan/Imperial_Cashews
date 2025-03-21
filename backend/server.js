import connection from "./connection.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//routes
import initialTestRoute from "./routes/initialTestRoute.js";
import Finance_management from "./routes/Finance/Finance_PettyCash.js";
import quality_end_product_check from "./routes/QualityControle/quality_end_product_check.js"

dotenv.config(); // Load .env file

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use(initialTestRoute);
app.use(quality_end_product_check);
app.use(Finance_management);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connection.connectToServer();
});



//run == node server.js