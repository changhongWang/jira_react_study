/*
 * @Description:
 * @Author: changhong.wang
 * @Date: 2021-10-21 11:32:09
 * @LastEditors: changhong.wang
 * @LastEditTime: 2021-10-26 19:35:15
 */
import { Table } from "antd";
import { User } from "./SearchPanel";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}

interface ListProps {
  list: Project[];
  userList: User[];
}

export const List = ({ list, userList }: ListProps) => {
  return (
    <Table
      columns={[
        {
          title: "名称",
          dataIndex: "sys_name",
          sorter: (a, b) => a.sys_name.localeCompare(b.sys_name),
        },
        {
          title: "负责人",
          dataIndex: "priciple",
        },
      ]}
      dataSource={list.map((item, index) => {
        return {
          key: index,
          sys_name: item.name,
          priciple: userList.find((user) => user.id === item.personId)?.name,
        };
      })}
    />
  );
};
