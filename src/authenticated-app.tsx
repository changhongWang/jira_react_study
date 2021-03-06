import { Route, Routes } from "react-router";
import styled from "@emotion/styled";
import { Dropdown, Menu, Button } from "antd";
import { useAuth } from "./context/auth-context";
import { resetRoute } from "./utils";
import { ReactComponent as JiraLogo } from "./assets/software-logo.svg";
import ProjectListScreen from "./screens/project-list";
import { ProjectScreen } from "./screens/project";
import { ProjectModal } from "./screens/project-list/project-modal";
import { ProjectPopOver } from "./components/ProjectPopOver";
import { UserPopOver } from "./components/UserPopOver";
import { NoPaddingButton } from "./components/lib";
import { TestUndo } from "./screens/TestUndo";

const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        <Routes>
          <Route path="/projects" element={<ProjectListScreen />} />
          <Route path="/projects/:id/*" element={<ProjectScreen />} />
          <Route path="/test" element={<TestUndo />} />
          <Route path="/" element={<ProjectListScreen />} />
        </Routes>
      </Main>
      <ProjectModal />
    </Container>
  );
};

export default AuthenticatedApp;

const PageHeader = () => {
  const { user, logout } = useAuth();
  return (
    <Header>
      <CommonFlex>
        <NoPaddingButton type="link" onClick={resetRoute}>
          <JiraLogo width="18rem" color="rgb(38, 132, 255)" />
        </NoPaddingButton>
        <TopMenuList>
          <TopMenuListItem>
            <ProjectPopOver />
          </TopMenuListItem>
          <TopMenuListItem>
            <UserPopOver />
          </TopMenuListItem>
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

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
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

const Main = styled.div`
  overflow: hidden;
`;
