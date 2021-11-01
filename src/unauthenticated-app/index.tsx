import React, { useState } from "react";
import LoginScreen from "./login";
import RegisterScreen from "./register";

const UnAuthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  return (
    <div>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}
      <button
        onClick={() => {
          setIsRegister(!isRegister);
        }}
      >
        切换到{isRegister ? "登录" : "注册"}
      </button>
    </div>
  );
};

export default UnAuthenticatedApp;
