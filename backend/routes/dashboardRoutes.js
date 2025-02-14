// routes/dashboardRoutes.js
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Защищенный маршрут
router.get("/dashboard", authMiddleware, (req, res) => {
  // Теперь у вас есть доступ к req.userId
  res.json({ message: "Добро пожаловать на защищенную страницу!", userId: req.userId });
});

module.exports = router;
