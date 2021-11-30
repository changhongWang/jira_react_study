import styled from "@emotion/styled";
import { Card } from "antd";
import { Kanban } from "../../types/kanban";
import { useTasks } from "../../utils/task";
import { useTaskTypes } from "../../utils/taskType";
import { useTaskModal, useTasksSearchParams } from "./util";
import TaskIcon from "../../assets/task.svg";
import BugIcon from "../../assets/bug.svg";
import { CreateTask } from "./CreateTask";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) {
    return null;
  }
  console.log(name);
  return <img alt="" src={name === "task" ? TaskIcon : BugIcon} />;
};

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  const { startEdit } = useTaskModal();
  return (
    <Container>
      <h3>{kanban.name}</h3>
      <TaskContainer>
        {tasks?.map((task) => (
          <Card
            style={{ marginBottom: "0.5rem", cursor: "pointer" }}
            key={task.id}
            onClick={() => {
              startEdit(task.id);
            }}
          >
            <div>{task.name}</div>
            <TaskTypeIcon id={task.id} />
          </Card>
        ))}
        <CreateTask kanbanId={kanban.id} />
      </TaskContainer>
    </Container>
  );
};

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
