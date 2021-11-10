/*
 * @Description:
 * @Author: changhong.wang
 * @Date: 2021-10-21 11:32:09
 * @LastEditors: changhong.wang
 * @LastEditTime: 2021-10-26 19:35:15
 */
import { Table } from "antd";
import dayjs from "dayjs";
import { User } from "./SearchPanel";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
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
          title: "部门",
          dataIndex: "department",
        },
        {
          title: "负责人",
          dataIndex: "priciple",
        },
        {
          title: "创建时间",
          dataIndex: "created",
        },
      ]}
      dataSource={list.map((item, index) => {
        return {
          key: index,
          sys_name: item.name,
          department: item.organization,
          priciple: userList.find((user) => user.id === item.personId)?.name,
          created: item.created
            ? dayjs(item.created).format("YYYY-MM-DD")
            : "无",
        };
      })}
    />
  );
};
