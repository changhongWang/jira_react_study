// 封装fetch
import qs from "qs";
import * as auth from "../auth-provider";
import { useAuth } from "../context/auth-context";

// API地址
const apiUrl = process.env.REACT_APP_API_URL;

// config interface
interface HttpConfig extends RequestInit {
  data?: object;
  token?: string;
}

// 抽离的公共http方法
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: HttpConfig = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (res) => {
    if (res.status === 401) {
      // 未登录处理
      await auth.logout();
      window.location.reload();
      return Promise.reject({
        message: "请重新登录",
      });
    }

    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

// 可以自动携带JWT Token的方法 在调用方法时传入 user
export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, {
      ...config,
      token: user?.token,
    });
};

// ts test
interface Person {
  name: string;
  gender: string;
  address?: string;
}

// const obj: Partial<Person> = {
//   name: "waang",
//   gender: "male",
// };

// type PersonKey = keyof Person;

// type T0 = Extract<"a" | "b" | "c" | "f", "a" | "f">;
// const abc: T0 = "f";
// type T1 = Extract<string | number | (() => void), Function>;
