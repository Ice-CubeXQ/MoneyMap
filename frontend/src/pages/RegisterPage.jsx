import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/forms/PasswordInput";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: formData.name, email: formData.email, password: formData.password }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/login");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Ошибка при регистрации");
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__container">
        <form className="login-page__form login-form" onSubmit={handleSubmit}>
          <h1 className="login-form__title">Sign up</h1>
          {error && <p className="error-message">{error}</p>}
          <div className="login-form__items">
            <div className="login-form__item">
              <label htmlFor="email">Email</label>
              <input autoComplete="off" type="email" name="email" id="email" placeholder="" className="login-input" value={formData.email} onChange={handleChange} />
            </div>
            <div className="login-form__item">
              <label htmlFor="name">Name</label>
              <input autoComplete="off" type="text" name="name" id="name" placeholder="" className="login-input" value={formData.name} onChange={handleChange} />
            </div>
            <PasswordInput value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          </div>
          <button type="submit" className="login-form__button">
            Sign up
          </button>
          <div className="login-form__link">
            Do you already have an account? <Link to="/login">Sign In!</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
