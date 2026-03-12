const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

const destinationRoutes = require("./routes/destinationRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/admin",adminRoutes);

app.use("/api/destinations", destinationRoutes);
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
console.log("Server running on port 5000");
});