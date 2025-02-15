const db = require("../config/db");

const getDashboardData = (req, res) => {
  const userId = req.user.id;

  // Пример запроса к базе данных для получения данных пользователя
  const query = "SELECT username, email FROM Users WHERE user_id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Ошибка при получении данных" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const user = results[0];
    res.json({ user });
  });
};

module.exports = { getDashboardData };
