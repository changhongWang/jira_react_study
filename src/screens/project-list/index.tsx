/*
 * @Description:
 * @Author: changhong.wang
 * @Date: 2021-10-21 11:26:44
 * @LastEditors: changhong.wang
 * @LastEditTime: 2021-10-27 07:07:42
 */
import { useState, useEffect } from "react";
import qs from "querystring";
import { List } from "./list";
import { SearchPanel } from "./SearchPanel";
import { cleanObject, useDebounce, testMode } from "../../utils";

const apiUrl = process.env.REACT_APP_API_URL;
const a = 5;
console.log(testMode(a));

const ProjectListScreen = () => {
  const [userList, setUserList] = useState([]);
  const [list, setList] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const debouncedParam = useDebounce(param, 500);
  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (res) => {
      if (res.ok) {
        setList(await res.json());
      }
    });
  }, [debouncedParam]);
  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
        setUserList(await res.json());
      }
    });
  }, []);

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} userList={userList} />
      <List list={list} userList={userList} />
    </div>
  );
};

export default ProjectListScreen;
