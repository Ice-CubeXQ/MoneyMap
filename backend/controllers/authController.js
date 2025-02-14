const bcrypt = require("bcrypt");
const db = require("../config/db");
const jwt = require("jsonwebtoken");

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

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Находим пользователя по email
    const query = "SELECT * FROM Users WHERE email = ?";
    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error("Ошибка при поиске пользователя:", err);
        return res.status(500).json({ error: "Ошибка при входе" });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Неверный email или пароль" });
      }

      const user = results[0];

      // Сравниваем пароль
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Неверный email или пароль" });
      }

      // Создаем JWT токен
      const token = jwt.sign({ userId: user.user_id }, "yX9-qjE2p2tFVtMl8-Q7w9G_RxTc1A7_FUu9p_MHeBQ", { expiresIn: "1h" });

      res.json({ token });
    });
  } catch (error) {
    console.error("Ошибка при входе:", error);
    res.status(500).json({ error: "Ошибка при входе" });
  }
};

module.exports = { registerUser, loginUser };
