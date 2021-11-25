/*
 * @Description:
 * @Author: changhong.wang
 * @Date: 2021-10-21 11:32:09
 * @LastEditors: changhong.wang
 * @LastEditTime: 2021-10-26 19:35:15
 */
import { Dropdown, Table, TableProps, Menu } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { User } from "./SearchPanel";
import { Pin } from "../../components/Pin";
import { useEditProject } from "../../utils/project";
import { NoPaddingButton } from "../../components/lib";
import { useProjectModal } from "./util";

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
  const { mutate } = useEditProject();
  const { startEdit } = useProjectModal();
  const pinProject = (id: number) => (pin: boolean) => {
    mutate({ id, pin });
  };
  return (
    <Table
      rowKey="id"
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} />,
          render(val, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
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
        {
          render(val, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="edit">
                      <NoPaddingButton
                        type="link"
                        onClick={() => {
                          startEdit(project.id);
                        }}
                      >
                        编辑
                      </NoPaddingButton>
                    </Menu.Item>
                  </Menu>
                }
              >
                <NoPaddingButton type="link">...</NoPaddingButton>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    />
  );
};
