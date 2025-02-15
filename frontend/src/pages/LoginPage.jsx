import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/forms/PasswordInput";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const login = (userData) => setUser(userData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        login(data.user); // Устанавливаем пользователя в контексте
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Ошибка при входе");
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__container">
        <form className="login-page__form login-form" onSubmit={handleSubmit}>
          <h1 className="login-form__title">Sign in</h1>
          {error && <p className="error-message">{error}</p>}
          <div className="login-form__items">
            <div className="login-form__item">
              <label htmlFor="email">Email</label>
              <input autoComplete="off" type="email" name="email" id="email" className="login-input" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="login-form__button">
            Sign in
          </button>
          <div className="login-form__link">
            Don't have an account? <Link to="/registration">Sign Up!</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
