const express = require("express");
const { registerUser } = require("../controllers/authController");

const router = express.Router();

// Маршрут для регистрации
router.post("/register", registerUser);

module.exports = router;
