const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const db = require("../config/db");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);

  const query = "INSERT INTO Users (username, email, password_hash) VALUES (?, ?, ?)";
  db.query(query, [username, email, hashedPassword], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Ошибка при регистрации пользователя" });
    }
    res.status(201).json({ message: "Пользователь зарегистрирован" });
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM Users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: "Неверный email или пароль" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Неверный email или пароль" });
    }

    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    res.json({ message: "Успешный вход", user: { id: user.user_id, username: user.username, email: user.email } });
  });
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Успешный выход" });
};

const jwt = require("jsonwebtoken");

const me = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Не авторизован" });
  }
  res.json({ user: req.user });
};

module.exports = { register, login, logout, me };
