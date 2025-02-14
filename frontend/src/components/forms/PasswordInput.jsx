import { useState } from "react";

const PasswordInput = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-form__item">
      <div className="login-form__pass-label">
        <label htmlFor="pass">Password</label>
        <button className="show-pass-button" type="button" onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      <input autoComplete="off" type={showPassword ? "text" : "password"} name="pass" id="pass" placeholder="" className="login-input" value={value} onChange={onChange} />
    </div>
  );
};

export default PasswordInput;
