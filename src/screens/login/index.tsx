import React, { FormEvent, useContext } from "react";
import { useAuth } from "../../context/auth-context";

export const LoginScreen = (props: any) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { user, login, register, logout } = useAuth();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLFormElement).value;
    const password = (e.currentTarget.elements[1] as HTMLFormElement).value;
    login({ username, password });
  };

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLFormElement).value;
    const password = (e.currentTarget.elements[1] as HTMLFormElement).value;
    register({ username, password });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        {user?.name ? <h2>登录成功，用户名: {user.name}</h2> : ""}
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

      <form onSubmit={handleRegister}>
        <h3>注册</h3>
        <div>
          <label htmlFor="username2">用户名</label>
          <input type="text" id="username2" />
        </div>
        <div>
          <label htmlFor="password2">密码</label>
          <input type="password" id="password2" />
        </div>
        <div>
          <button type="submit">注册</button>
        </div>
      </form>
    </>
  );
};
