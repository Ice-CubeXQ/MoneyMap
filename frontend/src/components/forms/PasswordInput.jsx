import { useState } from "react";

const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-form__item">
      <div className="login-form__pass-label">
        <label htmlFor="pass">Password</label>
        <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      <input autoComplete="off" type={showPassword ? "text" : "password"} name="pass" id="pass" placeholder="" className="login-input" />
    </div>
  );
};

export default PasswordInput;
