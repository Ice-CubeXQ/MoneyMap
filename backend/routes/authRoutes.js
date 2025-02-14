const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// Маршрут для регистрации
router.post("/register", registerUser);

// Маршрут для входа
router.post("/login", loginUser);

module.exports = router;
