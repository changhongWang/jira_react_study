// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发。
import { User } from "./screens/project-list/SearchPanel";

const apiUrl = process.env.REACT_APP_API_URL;
const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (param: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param),
  }).then(async (res) => {
    if (res.ok) {
      // 成功之后，存到local
      console.log(res);
      return handleUserResponse(await res.json());
    } else {
      return Promise.reject(param);
    }
  });
};

export const register = (param: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param),
  }).then(async (res) => {
    if (res.ok) {
      console.log(res);
      return handleUserResponse(await res.json());
    } else {
      return Promise.reject(param);
    }
  });
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
