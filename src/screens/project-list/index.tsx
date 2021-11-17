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
import { useDocumentTitle } from "../../utils";
import Test from "./test";
import { useUrlQueryParam } from "../../utils/url";

const ProjectListScreen = () => {
  const client = useHttp();

  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  const debouncedParam = useDebounce(param, 500);
  console.log(debouncedParam);
  const { data: list, isLoading, isError, error } = useProjects(debouncedParam);
  const { data: userList } = useUsers();

  useDocumentTitle("项目列表");

  return (
    <Container>
      <h1>项目列表</h1>
      <Test />
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
