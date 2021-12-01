import styled from "@emotion/styled";
import { Card, Dropdown, Menu, Modal } from "antd";
import { Kanban } from "../../types/kanban";
import { useTasks } from "../../utils/task";
import { useTaskTypes } from "../../utils/taskType";
import { useKanbansQueryKey, useTaskModal, useTasksSearchParams } from "./util";
import TaskIcon from "../../assets/task.svg";
import BugIcon from "../../assets/bug.svg";
import { CreateTask } from "./CreateTask";
import { Task } from "../../types/task";
import { Mark } from "../../components/mark";
import { NoPaddingButton } from "../../components/lib";
import { useDeleteKanban } from "../../utils/kanban";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) {
    return null;
  }
  console.log(name);
  return <img alt="" src={name === "task" ? TaskIcon : BugIcon} />;
};

// 任务卡片
const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTaskModal();
  const { name: keyword } = useTasksSearchParams();

  return (
    <Card
      style={{ marginBottom: "0.5rem", cursor: "pointer" }}
      key={task.id}
      onClick={() => {
        startEdit(task.id);
      }}
    >
      <Mark keyword={keyword || ""} name={task.name} />
      <TaskTypeIcon id={task.id} />
    </Card>
  );
};

// 看板列
export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  return (
    <Container>
      <KanbanTitle>
        {kanban.name}
        <More kanban={kanban} />
      </KanbanTitle>
      <TaskContainer>
        {tasks?.map((task) => (
          <TaskCard task={task} />
        ))}
        <CreateTask kanbanId={kanban.id} />
      </TaskContainer>
    </Container>
  );
};

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync: deleteKanban } = useDeleteKanban(useKanbansQueryKey());
  const ConfirmDel = (id: number) => {
    Modal.confirm({
      title: "确定删除该项？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        return deleteKanban({ id });
      },
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="delete" onClick={() => ConfirmDel(kanban.id)}>
            删除
          </Menu.Item>
        </Menu>
      }
    >
      <NoPaddingButton type="link">...</NoPaddingButton>
    </Dropdown>
  );
};

const KanbanTitle = styled.h3`
  display: flex;
  justify-content: space-between;
  margin: 0 0.5rem;
  > span {
    color: rgba(0, 0, 0, 0.1);
  }
`;

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TaskContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;
