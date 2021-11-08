import React, { useState } from "react";
import LoginScreen from "./login";
import RegisterScreen from "./register";
import { Button, Card } from "antd";

const UnAuthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card>
        {isRegister ? <RegisterScreen /> : <LoginScreen />}
        <Button
          type="default"
          style={{
            marginTop: "20px",
          }}
          onClick={() => {
            setIsRegister(!isRegister);
          }}
        >
          切换到{isRegister ? "登录" : "注册"}
        </Button>
      </Card>
    </div>
  );
};

export default UnAuthenticatedApp;
