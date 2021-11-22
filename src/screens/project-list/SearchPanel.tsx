/** @jsxImportSource @emotion/react */
/*
 * @Description:
 * @Author: changhong.wang
 * @Date: 2021-10-21 11:34:56
 * @LastEditors: changhong.wang
 * @LastEditTime: 2021-10-26 19:34:46
 */
import React from "react";
import { Input, Form } from "antd";
import IDSelect from "../../components/IDSelect";
import { Project } from "./list";

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchProps {
  param: Partial<Pick<Project, "name" | "personId">>;
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
        <IDSelect
          value={param.personId}
          onChange={(value) => {
            setParam({
              ...param,
              personId: value,
            });
          }}
          defaultOptionName="负责人"
          options={userList}
        />
      </Form.Item>
    </Form>
  );
};
