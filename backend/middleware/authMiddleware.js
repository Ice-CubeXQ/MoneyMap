// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Получаем токен из заголовка Authorization
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Доступ запрещен. Токен отсутствует." });
  }

  try {
    // Проверяем токен
    const decoded = jwt.verify(token, "yX9-qjE2p2tFVtMl8-Q7w9G_RxTc1A7_FUu9p_MHeBQ"); // Используйте тот же секретный ключ, что и при создании токена
    req.userId = decoded.userId; // Добавляем ID пользователя в запрос
    next(); // Переходим к следующему middleware или маршруту
  } catch (error) {
    res.status(401).json({ error: "Неверный токен." });
  }
};

module.exports = authMiddleware;
