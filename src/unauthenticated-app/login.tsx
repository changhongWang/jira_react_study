import React, { FormEvent, useContext } from "react";
import { useAuth } from "../context/auth-context";

const LoginScreen = (props: any) => {
  const { login } = useAuth();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLFormElement).value;
    const password = (e.currentTarget.elements[1] as HTMLFormElement).value;
    login({ username, password });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>登录</h3>
        <div>
          <label htmlFor="username">用户名</label>
          <input type="text" id="username" />
        </div>
        <div>
          <label htmlFor="password">密码</label>
          <input type="password" id="password" />
        </div>
        <div>
          <button type="submit">登录</button>
        </div>
      </form>
    </>
  );
};

export default LoginScreen;
