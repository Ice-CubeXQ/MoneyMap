const bcrypt = require("bcrypt");
const db = require("../config/db");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
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
  } catch (error) {
    console.error("Ошибка при хэшировании пароля:", error);
    res.status(500).json({ error: "Ошибка при регистрации" });
  }
};

module.exports = { registerUser };
