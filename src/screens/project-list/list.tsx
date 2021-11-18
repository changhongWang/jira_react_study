/*
 * @Description:
 * @Author: changhong.wang
 * @Date: 2021-10-21 11:32:09
 * @LastEditors: changhong.wang
 * @LastEditTime: 2021-10-26 19:35:15
 */
import { Table, TableProps } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { User } from "./SearchPanel";

// 接口
export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  userList: User[];
}

export const List = ({ userList, ...props }: ListProps) => {
  return (
    <Table
      rowKey="id"
      pagination={false}
      columns={[
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(val, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(val, project) {
            return (
              <span>
                {userList.find((user) => user.id === Number(project.personId))
                  ?.name || "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(val, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
      {...props}
    />
  );
};
