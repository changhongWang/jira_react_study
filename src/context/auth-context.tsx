import React, { useCallback, useContext } from "react";
import * as auth from "../auth-provider";
import { User } from "../screens/project-list/SearchPanel";
import { useMount } from "../utils";
import { useAsync } from "../utils/useAsync";
import { FullPageErrorFallback, FullPageLoading } from "../components/lib";
import { http } from "../utils/http";

interface AuthForm {
  username: string;
  password: string;
}

const initUser = async () => {
  // 进入页面时 检查是否有token
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => void;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null);
  const {
    data: user,
    setData: setUser,
    run,
    isLoading,
    isIdle,
    isError,
    error,
  } = useAsync<User | null>();

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(
    useCallback(async () => {
      run(initUser());
    }, [run])
  );

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
