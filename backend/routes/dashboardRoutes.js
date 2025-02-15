const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getDashboardData } = require("../controllers/dashboardController");

const router = express.Router();

// Защищенный маршрут для получения данных дашборда
router.get("/dashboard", authMiddleware, getDashboardData);

module.exports = router;
