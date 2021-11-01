// 封装fetch
import qs from "qs";
import * as auth from "../auth-provider";

const apiUrl = process.env.REACT_APP_API_URL;

interface HttpConfig extends RequestInit {
  data?: object;
  token?: string;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: HttpConfig
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
