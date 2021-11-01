import React from "react";
import { useAuth } from "./context/auth-context";
import ProjectListScreen from "./screens/project-list";

const AuthenticatedApp = () => {
  // 已登录
  const { user, logout } = useAuth();
  return (
    <div>
      {user ? <h2>用户名: {user.name}</h2> : ""}
      <button onClick={logout}>登出</button>
      <ProjectListScreen />
    </div>
  );
};

export default AuthenticatedApp;
