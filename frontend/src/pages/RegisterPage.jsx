import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/forms/PasswordInput";
import { useState } from "react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate("/login");
      } else {
        // Обработка ошибок
        const data = await response.json();
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration");
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__container">
        <form className="login-page__form login-form" onSubmit={handleSubmit}>
          <h1 className="login-form__title">Sign up</h1>

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
