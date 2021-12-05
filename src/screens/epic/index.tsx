import React, { useState } from "react";
import { Button, List, Modal } from "antd";
import { Row, ScreenContainer } from "../../components/lib";
import { useDeleteEpic, useEpics } from "../../utils/epic";
import { useProjectInUrl } from "../kanban/util";
import { useEpicSearchParams, useEpicsQueryKey } from "./util";
import dayjs from "dayjs";
import { useTasks } from "../../utils/task";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { CreateEpic } from "./CreateEpic";

export const Epic = () => {
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey());
  return (
    <ScreenContainer>
      <TitleContainer>
        <h1>{currentProject?.name}任务组</h1>
        <Button type="link" onClick={() => setEpicCreateOpen(true)}>
          新增
        </Button>
      </TitleContainer>
      <List
        style={{ overflow: "scroll" }}
        dataSource={epics}
        itemLayout="vertical"
        renderItem={(epic) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row between={true}>
                  <span>{epic.name}</span>
                  <Button
                    onClick={() => {
                      Modal.confirm({
                        title: "确定删除该项？",
                        content: "点击确定删除",
                        okText: "确定",
                        cancelText: "取消",
                        onOk: () => {
                          deleteEpic({
                            id: epic.id,
                          });
                        },
                      });
                    }}
                    type="link"
                  >
                    删除
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>开始时间: {dayjs(epic.start).format("YYYY-MM-DD")}</div>
                  <div>结束时间: {dayjs(epic.end).format("YYYY-MM-DD")}</div>
                </div>
              }
            />
            <div>
              {tasks
                ?.filter((task) => task.epicId === epic.id)
                .map((task) => (
                  <Link
                    key={task.id}
                    to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                  >
                    {task.name}
                  </Link>
                ))}
            </div>
          </List.Item>
        )}
      />
      <CreateEpic
        visible={epicCreateOpen}
        onClose={() => setEpicCreateOpen(false)}
      />
    </ScreenContainer>
  );
};

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
