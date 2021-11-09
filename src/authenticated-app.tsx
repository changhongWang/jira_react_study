import React from "react";
import styled from "@emotion/styled";
import { useAuth } from "./context/auth-context";
import ProjectListScreen from "./screens/project-list";
import logo from "./assets/logo.svg";
import { User } from "./screens/project-list/SearchPanel";

const AuthenticatedApp = () => {
  // 已登录
  const { user, logout } = useAuth();
  return (
    <div>
      <Header>
        <CommonFlex>
          <Logo />
          <TopMenuList>
            <TopMenuListItem>项目</TopMenuListItem>
            <TopMenuListItem>用户</TopMenuListItem>
          </TopMenuList>
        </CommonFlex>
        {user && <a href="#">Hi, {user?.name}</a>}
      </Header>
      {/* <button onClick={logout}>登出</button> */}
      <h1>项目列表</h1>
      <ProjectListScreen />
    </div>
  );
};

export default AuthenticatedApp;

const CommonFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Logo = styled.a`
  display: inline-block;
  width: 12rem;
  height: 5rem;
  background: url(${logo}) no-repeat 0 0 / contain;
`;

const TopMenuList = styled.ul`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  list-style: none;
`;
const TopMenuListItem = styled.li`
  font-size: 1.6rem;
  cursor: pointer;
  width: 4rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  height: 5rem;
`;
