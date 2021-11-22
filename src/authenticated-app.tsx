import React, { useState } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "@emotion/styled";
import { Dropdown, Menu, Button } from "antd";
import { useAuth } from "./context/auth-context";
import { resetRoute } from "./utils";
import { ReactComponent as JiraLogo } from "./assets/software-logo.svg";
import ProjectListScreen from "./screens/project-list";
import { ProjectScreen } from "./screens/project";
import { ProjectModal } from "./screens/project-list/project-modal";
import { ProjectPopOver } from "./components/ProjectPopOver";
import { NoPaddingButton } from "./components/lib";

const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const openProjectModal = () => setProjectModalOpen(true);
  return (
    <div>
      <PageHeader
        projectButton={
          <NoPaddingButton type="link" onClick={openProjectModal}>
            创建项目
          </NoPaddingButton>
        }
      />
      <Router>
        <Routes>
          <Route
            path="/projects"
            element={
              <ProjectListScreen
                projectButton={
                  <Button type="default" onClick={openProjectModal}>
                    创建项目
                  </Button>
                }
              />
            }
          />
          <Route path="/projects/:id/*" element={<ProjectScreen />} />
        </Routes>
      </Router>
      <ProjectModal
        onClose={() => setProjectModalOpen(false)}
        projectModalOpen={projectModalOpen}
      />
    </div>
  );
};

export default AuthenticatedApp;

const PageHeader = ({ projectButton }: { projectButton: JSX.Element }) => {
  const { user, logout } = useAuth();
  return (
    <Header>
      <CommonFlex>
        <NoPaddingButton type="link" onClick={resetRoute}>
          <JiraLogo width="18rem" color="rgb(38, 132, 255)" />
        </NoPaddingButton>
        <TopMenuList>
          <TopMenuListItem>
            <ProjectPopOver projectButton={projectButton} />
          </TopMenuListItem>
          <TopMenuListItem>用户</TopMenuListItem>
        </TopMenuList>
      </CommonFlex>
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key="logout">
              <Button type="link" onClick={logout}>
                登出
              </Button>
            </Menu.Item>
          </Menu>
        }
      >
        <Button type="link" onClick={(e) => e.preventDefault()}>
          Hi, {user?.name}
        </Button>
      </Dropdown>
    </Header>
  );
};
export const CommonFlex = styled.div`
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
