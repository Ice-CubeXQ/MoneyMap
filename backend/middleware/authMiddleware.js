const jwt = require("jsonwebtoken");
const db = require("../config/db");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Нет доступа" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // После того как токен декодирован, извлекаем пользователя из базы данных
    const query = "SELECT * FROM Users WHERE user_id = ?";
    db.query(query, [decoded.id], (err, results) => {
      if (err || results.length === 0) {
        return res.status(401).json({ message: "Пользователь не найден" });
      }

      // Удаляем поле password_hash перед сохранением в req.user
      const user = results[0];
      delete user.password_hash; // Удаляем пароль из объекта

      req.user = user; // Сохраняем без пароля
      next();
    });
  } catch (err) {
    return res.status(401).json({ message: "Недействительный токен" });
  }
};

module.exports = authMiddleware;
