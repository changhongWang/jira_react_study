// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发。
import { User } from "./screens/project-list/SearchPanel";

const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = () => {};

export const login = () => {};

export const register = () => {};
