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
import { cleanObject, useDebounce } from "../../utils";
import { useHttp } from "../../utils/http";

const ProjectListScreen = () => {
  const [userList, setUserList] = useState([]);
  const [list, setList] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const client = useHttp();

  const debouncedParam = useDebounce(param, 500);
  useEffect(() => {
    client("projects", {
      data: cleanObject(debouncedParam),
    }).then(setList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam]);
  useEffect(() => {
    client("users").then(setUserList);
  }, []);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} userList={userList} />
      <List list={list} userList={userList} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectListScreen;
