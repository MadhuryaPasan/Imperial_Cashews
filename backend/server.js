import connection from "./connection.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import initialTestRoute from "./routes/initialTestRoute.js";
import Finance_PettyCash from "./routes/Finance/Finance_PettyCash.js";
import sales_Product from "./routes/sales/Sales_Product.js"
import Sales_Customer from "./routes/sales/Sales_Customer.js"
import Sales_Orders from "./routes/sales/Sales_Order.js"
import Sales_Payment from "./routes/sales/Sales_Payment.js"
import Sales_Sales from "./routes/sales/Sales_Sales.js"
import Quality_end_product_check from "./routes/QualityControle/quality_end_product_check.js"
import Inventory_FinalProduct from "./routes/Inventory/Inventory_FinalProduct.js";
import Finance_BalanceSheet from "./routes/Finance/Finance_BalanceSheet.js";
import Quality_iso_sls_check from "./routes/QualityControle/quality_iso_sls_check.js";
import Quality_raw_material_check from "./routes/QualityControle/quality_raw_material_check.js";
import Staff_Employee from "./routes/Staff/Staff_Employee.js"
import Inventory_Material from "./routes/Inventory/Inventory_Material.js";
import Inventory_Stock from  "./routes/Inventory/Inventory_Stock.js";
import Inventory_supplierDetail from "./routes/Inventory/Inventory_supplierDetail.js";
import Finance_BankBook from "./routes/Finance/Finance_BankBook.js";
import Inventory_RawCashews_StockLevel from "./routes/Inventory/Inventory_RawCashews_StockLevel.js";
import Staff_Attendance from "./routes/Staff/Staff_Attendance.js";
import Finance_ProfitLoss from "./routes/Finance/Finance_ProfitLoss.js";



dotenv.config(); // Load .env file

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use(initialTestRoute);
app.use(Quality_end_product_check);
app.use(Finance_PettyCash);
app.use(sales_Product);
app.use(Sales_Customer);
app.use(Sales_Orders);
app.use(Sales_Payment);
app.use(Sales_Sales);
app.use(Inventory_FinalProduct);
app.use(Finance_BalanceSheet);
app.use(Quality_iso_sls_check);
app.use(Quality_raw_material_check);
app.use(Staff_Employee);
app.use(Inventory_Material);
app.use(Inventory_Stock);
app.use(Inventory_supplierDetail);
app.use(Finance_BankBook);
app.use(Inventory_RawCashews_StockLevel);
app.use(Staff_Attendance);
app.use(Finance_ProfitLoss);


app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
  connection.connectToServer();
});
