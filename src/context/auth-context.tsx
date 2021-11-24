import React, { useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as authStore from "../store/auth.slice";
import * as auth from "../auth-provider";
import { User } from "../screens/project-list/SearchPanel";
import { useMount } from "../utils";
import { useAsync } from "../utils/useAsync";
import { FullPageErrorFallback, FullPageLoading } from "../components/lib";
import { http } from "../utils/http";

export interface AuthForm {
  username: string;
  password: string;
}

export const initUser = async () => {
  // 进入页面时 检查是否有token
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null);
  const { run, isLoading, isIdle, isError, error } = useAsync<User | null>();

  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  useMount(
    useCallback(() => {
      run(dispatch(authStore.init()));
    }, [run, dispatch])
  );

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return <div>{children}</div>;
};

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const user = useSelector(authStore.selectUser);
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);

  return {
    user,
    login,
    register,
    logout,
  };
};
