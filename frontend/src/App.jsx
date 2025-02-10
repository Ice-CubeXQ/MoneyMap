import React, { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Обработчик изменений в форме
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы

    try {
      const response = await axios.post("/api/register", formData);
      setMessage(response.data.message);
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      setMessage("Ошибка при регистрации");
    }
  };

  return (
    <div>
      <h1>MoneyMap</h1>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} />
        </div>

        <button type="submit">Submit</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
