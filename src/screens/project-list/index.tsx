/*
 * @Description:
 * @Author: changhong.wang
 * @Date: 2021-10-21 11:26:44
 * @LastEditors: changhong.wang
 * @LastEditTime: 2021-10-27 07:07:42
 */
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { List } from "./list";
import { SearchPanel } from "./SearchPanel";
import { useDebounce } from "../../utils";
import { useHttp } from "../../utils/http";
import { Typography } from "antd";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";

const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const client = useHttp();

  const debouncedParam = useDebounce(param, 500);
  const { data: list, isLoading, isError, error } = useProjects(debouncedParam);
  const { data: userList } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
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
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectListScreen;
