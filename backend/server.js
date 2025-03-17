import connection from "./connection.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//routes
import initialTestRoute from "./routes/initialTestRoute.js";
import Staff_Employee from "./routes/staff/Staff_Employee.js"

dotenv.config(); // Load .env file

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use(initialTestRoute);
app.use(Staff_Employee);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connection.connectToServer();
});



//run == node server.js