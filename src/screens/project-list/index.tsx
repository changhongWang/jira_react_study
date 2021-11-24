/*
 * @Description:
 * @Author: changhong.wang
 * @Date: 2021-10-21 11:26:44
 * @LastEditors: changhong.wang
 * @LastEditTime: 2021-10-27 07:07:42
 */
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { List } from "./list";
import { SearchPanel } from "./SearchPanel";
import { useDebounce } from "../../utils";
import { Button, Typography } from "antd";
import { CommonFlex } from "../../authenticated-app";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { useDocumentTitle } from "../../utils";
import { useProjectSearchParams } from "./util";
import { projectListActions } from "./projectList.slice";

const ProjectListScreen = () => {
  const [param, setParam] = useProjectSearchParams();
  const {
    data: list,
    isLoading,
    isError,
    error,
    retry,
  } = useProjects(useDebounce(param, 200));
  const { data: userList } = useUsers();
  const dispatch = useDispatch();

  useDocumentTitle("项目列表");

  return (
    <Container>
      <CommonFlex style={{ justifyContent: "space-between" }}>
        <h1>项目列表</h1>
        <Button
          type="default"
          onClick={() => dispatch(projectListActions.openProjectModal())}
        >
          创建项目
        </Button>
      </CommonFlex>
      <SearchPanel
        param={param}
        setParam={setParam}
        userList={userList || []}
      />
      {isError ? (
        <Typography.Text type="danger">{error?.message}</Typography.Text>
      ) : null}
      <List
        dataSource={list || []}
        userList={userList || []}
        loading={isLoading}
        retry={retry}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectListScreen;
