/*
 * @Description:
 * @Author: changhong.wang
 * @Date: 2021-10-21 11:26:44
 * @LastEditors: changhong.wang
 * @LastEditTime: 2021-10-27 07:07:42
 */
import styled from "@emotion/styled";
import { List } from "./list";
import { SearchPanel } from "./SearchPanel";
import { useDebounce } from "../../utils";
import { Button, Typography } from "antd";
import { CommonFlex } from "../../authenticated-app";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { useDocumentTitle } from "../../utils";
import { useProjectModal, useProjectSearchParams } from "./util";
import { ErrorBox } from "../../components/lib";

const ProjectListScreen = () => {
  const [param, setParam] = useProjectSearchParams();
  const {
    data: list,
    isLoading,
    isError,
    error,
  } = useProjects(useDebounce(param, 200));
  const { data: userList } = useUsers();

  useDocumentTitle("项目列表");

  const { open } = useProjectModal();
  return (
    <Container>
      <CommonFlex style={{ justifyContent: "space-between" }}>
        <h1>项目列表</h1>
        <Button type="default" onClick={open}>
          创建项目
        </Button>
      </CommonFlex>
      <SearchPanel
        param={param}
        setParam={setParam}
        userList={userList || []}
      />
      <ErrorBox error={error} />
      <List
        dataSource={list || []}
        userList={userList || []}
        loading={isLoading}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectListScreen;
