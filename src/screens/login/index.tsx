import React, { FormEvent } from "react";

export const LoginScreen = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const login = (param: { username: string; password: string }) => {
    fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    }).then(async (res) => {
      if (res.ok) {
        console.log(res);
      }
    });
  };

  const register = (param: { username: string; password: string }) => {
    fetch(`${apiUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    }).then(async (res) => {
      if (res.ok) {
        console.log(res);
      }
    });
  };

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
