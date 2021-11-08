/*
 * @Description:
 * @Author: changhong.wang
 * @Date: 2021-10-21 11:26:44
 * @LastEditors: changhong.wang
 * @LastEditTime: 2021-10-27 07:07:42
 */
import { useState, useEffect } from "react";
import qs from "qs";
import { Table } from "antd";
import { List } from "./list";
import { SearchPanel } from "./SearchPanel";
import { cleanObject, useDebounce, testMode } from "../../utils";
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
  }, [debouncedParam]);
  useEffect(() => {
    client("users").then(setUserList);
  }, []);

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} userList={userList} />
      <List list={list} userList={userList} />
    </div>
  );
};

export default ProjectListScreen;
