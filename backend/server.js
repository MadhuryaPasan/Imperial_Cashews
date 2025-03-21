import connection from "./connection.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//routes
import initialTestRoute from "./routes/initialTestRoute.js";
import Finance_management from "./routes/Finance/Finance_PettyCash.js";
import sales_Product from "./routes/sales/Sales_Product.js"
import Sales_Customer from "./routes/sales/Sales_Customer.js"
import Sales_Orders from "./routes/sales/Sales_Order.js"
import Sales_Payment from "./routes/sales/Sales_Payment.js"
import Sales_Sales from "./routes/sales/Sales_Sales.js"


dotenv.config(); // Load .env file

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use(initialTestRoute);
app.use(quality_end_product_check);
app.use(Finance_management);
app.use(sales_Product);
app.use(Sales_Customer);
app.use(Sales_Orders);
app.use(Sales_Payment);
app.use(Sales_Sales);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connection.connectToServer();
});



//run == node server.js