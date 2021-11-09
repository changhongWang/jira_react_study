/*
 * @Description:
 * @Author: changhong.wang
 * @Date: 2021-10-21 11:34:56
 * @LastEditors: changhong.wang
 * @LastEditTime: 2021-10-26 19:34:46
 */
import { Input, Select } from "antd";
import styled from "@emotion/styled";

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchProps {
  param: {
    name: string;
    personId: string;
  };
  setParam: (params: SearchProps["param"]) => void;
  userList: User[];
}

export const SearchPanel = ({ param, setParam, userList }: SearchProps) => {
  return (
    <form>
      <Input
        type="text"
        value={param.name}
        placeholder="项目名"
        onChange={(e) =>
          setParam({
            ...param,
            name: e.target.value,
          })
        }
      />
      {/* <Select
        value={param.personId}
        onChange={(e) => {
          setParam({
            ...param,
            personId: e,
          });
        }}
      >
        <Select.Option value={""}>负责人</Select.Option>
        {userList.map((user) => {
          return (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          );
        })}
      </Select> */}
    </form>
  );
};
