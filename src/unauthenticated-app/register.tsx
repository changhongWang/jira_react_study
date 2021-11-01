import React, { FormEvent, useContext } from "react";
import { useAuth } from "../context/auth-context";

const RegisterScreen = (props: any) => {
  const { register } = useAuth();

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLFormElement).value;
    const password = (e.currentTarget.elements[1] as HTMLFormElement).value;
    register({ username, password });
  };
  return (
    <>
      <form onSubmit={handleRegister}>
        <h3>注册</h3>
        <div>
          <label htmlFor="username">用户名</label>
          <input type="text" id="username" />
        </div>
        <div>
          <label htmlFor="password">密码</label>
          <input type="password" id="password" />
        </div>
        <div>
          <button type="submit">注册</button>
        </div>
      </form>
    </>
  );
};

export default RegisterScreen;
