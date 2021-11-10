import React from "react";
import styled from "@emotion/styled";
import { Dropdown, Menu } from "antd";
import { useAuth } from "./context/auth-context";
import { ReactComponent as JiraLogo } from "./assets/software-logo.svg";
import ProjectListScreen from "./screens/project-list";
import { User } from "./screens/project-list/SearchPanel";

const AuthenticatedApp = () => {
  // 已登录
  const { user, logout } = useAuth();
  return (
    <div>
      <Header>
        <CommonFlex>
          <JiraLogo width="18rem" color="rgb(38, 132, 255)" />
          <TopMenuList>
            <TopMenuListItem>项目</TopMenuListItem>
            <TopMenuListItem>用户</TopMenuListItem>
          </TopMenuList>
        </CommonFlex>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="logout">
                <a onClick={logout}>登出</a>
              </Menu.Item>
            </Menu>
          }
        >
          <a onClick={(e) => e.preventDefault()}>Hi, {user?.name}</a>
        </Dropdown>
      </Header>
      {/* <button onClick={logout}>登出</button> */}
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
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  height: 5rem;
`;
