import React, { useCallback } from "react";
import { Spin } from "antd";
import styled from "@emotion/styled";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drop, DropChild, Drag } from "../../components/drag-and-drop";
import { useDocumentTitle } from "../../utils";
import { useKanbans, useReorderKanban } from "../../utils/kanban";
import {
  useKanbanSearchParams,
  useKanbansQueryKey,
  useProjectInUrl,
  useTasksQueryKey,
  useTasksSearchParams,
} from "./util";
import { KanbanColumn } from "./KanbanColumn";
import { SearchPanel } from "./SearchPanel";
import { ScreenContainer } from "../../components/lib";
import { useReorderTask, useTasks } from "../../utils/task";
import { CreateKanban } from "./CreateKanban";
import { TaskEditModal } from "./TaskEditModal";

export const Kanban = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbanSearchParams()
  );
  const { isLoading: taskIsLoading } = useTasks();

  const isLoading = kanbanIsLoading || taskIsLoading;
  const onDragEnd = useDragEnd();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <ColumnContainer>
            <Drop type="COLUMN" direction="horizontal" droppableId={"kanban"}>
              <DropChild style={{ display: "flex" }}>
                {kanbans?.map((kanban, index) => {
                  return (
                    <Drag
                      key={kanban.id}
                      draggableId={"kanban" + kanban.id}
                      index={index}
                    >
                      <KanbanColumn kanban={kanban} key={kanban.id} />
                    </Drag>
                  );
                })}
              </DropChild>
            </Drop>
            <CreateKanban />
          </ColumnContainer>
        )}
        <TaskEditModal />
      </ScreenContainer>
    </DragDropContext>
  );
};

const ColumnContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;

export const useDragEnd = () => {
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { data: tasks = [] } = useTasks(useTasksSearchParams());
  const { mutate: reorderKanban } = useReorderKanban(useKanbansQueryKey());
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());
  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) return;
      // 看板排序
      if (type === "COLUMN") {
        const fromId = kanbans?.[source.index].id;
        const referenceId = kanbans?.[destination.index].id;
        if (!fromId || !referenceId || fromId === referenceId) return;
        const type = destination.index > source.index ? "after" : "before";
        reorderKanban({
          fromId,
          referenceId,
          type,
        });
      }
      // 看板内task排序
      if (type === "ROW") {
        const fromKanbanId = +source.droppableId;
        const toKanbanId = +destination.droppableId;
        if (fromKanbanId === toKanbanId) {
          return;
        }
        const fromTask = tasks.filter((task) => task.kanbanId === fromKanbanId)[
          source.index
        ];
        const toTask = tasks.filter((task) => task.kanbanId === toKanbanId)[
          destination.index
        ];
        if (fromTask?.id === toTask?.id) {
          return;
        }
        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId,
          toKanbanId,
          type:
            fromKanbanId === toKanbanId && destination.index > source.index
              ? "after"
              : "before",
        });
      }
    },
    [kanbans, tasks, reorderKanban, reorderTask]
  );
};
