/** @jsxImportSource @emotion/react */
/*
 * @Description:
 * @Author: changhong.wang
 * @Date: 2021-10-21 11:34:56
 * @LastEditors: changhong.wang
 * @LastEditTime: 2021-10-26 19:34:46
 */
import React from "react";
import { Input, Select, Form } from "antd";

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
    <Form css={{ marginBottom: "2rem" }} layout="inline">
      <Form.Item>
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
      </Form.Item>
      <Form.Item>
        <Select
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
        </Select>
      </Form.Item>
    </Form>
  );
};
