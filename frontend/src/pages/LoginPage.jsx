import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/forms/PasswordInput";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        alert(data.error || "Ошибка при входе");
      }
    } catch (error) {
      console.error("Ошибка при входе:", error);
      alert("Ошибка при входе");
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__container">
        <form className="login-page__form login-form" onSubmit={handleSubmit}>
          <h1 className="login-form__title">Sign in</h1>

          <div className="login-form__items">
            <div className="login-form__item">
              <label htmlFor="email">Email</label>
              <input autoComplete="off" type="email" name="email" id="email" placeholder="" className="login-input" value={email} onChange={(e) => setEmail(e.target.value)} />
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
