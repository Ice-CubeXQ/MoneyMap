const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Маршруты
app.use("/api/auth", authRoutes);
app.use("/api", dashboardRoutes);

module.exports = app;
