import { Link } from "react-router-dom";
import PasswordInput from "../components/forms/PasswordInput";

const RegisterPage = () => {
  return (
    <div className="login-page">
      <div className="login-page__container">
        <form className="login-page__form login-form">
          <h1 className="login-form__title">Sing up</h1>

          <div className="login-form__items">
            <div className="login-form__item">
              <label htmlFor="email">Email</label>
              <input autocomplete="off" type="email" name="email" id="email" placeholder="" class="login-input" />
            </div>
            <div className="login-form__item">
              <label htmlFor="name">Name</label>
              <input autocomplete="off" type="text" name="name" id="name" placeholder="" class="login-input" />
            </div>
            <PasswordInput />
          </div>

          <button className="login-form__button">Sign up</button>

          <div className="login-form__link">
            Do you already have an account? <Link to="/login">Sing In!</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RegisterPage;
