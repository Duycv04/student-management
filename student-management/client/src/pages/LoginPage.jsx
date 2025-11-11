import React, { useState } from "react";
import LoginForm from "./Login";
import RegisterForm from "./Register";



const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="login-container">
      <div className="login-box">
        {isRegister ? (
          <RegisterForm switchToLogin={() => setIsRegister(false)} />
        ) : (
          <LoginForm switchToRegister={() => setIsRegister(true)} />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
