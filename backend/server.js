const cors = require("cors");
const express = require("express");
const bcrypt = require("bcrypt"); // Для хэширования паролей
const db = require("./config/db");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Регистрация пользователя
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Хэшируем пароль
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Сохраняем пользователя в базе данных
  const query = "INSERT INTO Users (username, email, password_hash) VALUES (?, ?, ?)";
  db.query(query, [name, email, passwordHash], (err, results) => {
    if (err) {
      console.error("Ошибка при регистрации:", err);
      return res.status(500).json({ error: "Ошибка при регистрации" });
    }
    res.json({ message: "Пользователь успешно зарегистрирован" });
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
