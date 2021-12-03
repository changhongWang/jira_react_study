import React from "react";
import { Spin } from "antd";
import styled from "@emotion/styled";
import { DragDropContext } from "react-beautiful-dnd";
import { Drop, DropChild, Drag } from "../../components/drag-and-drop";
import { useDocumentTitle } from "../../utils";
import { useKanbans } from "../../utils/kanban";
import { useKanbanSearchParams, useProjectInUrl } from "./util";
import { KanbanColumn } from "./KanbanColumn";
import { SearchPanel } from "./SearchPanel";
import { ScreenContainer } from "../../components/lib";
import { useTasks } from "../../utils/task";
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
  return (
    <DragDropContext
      onDragEnd={() => {
        // 一般是持久化的代码
      }}
    >
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <Drop type="COLUMN" direction="horizontal" droppableId={"kanban"}>
            <ColumnContainer>
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
              <CreateKanban />
            </ColumnContainer>
          </Drop>
        )}
        <TaskEditModal />
      </ScreenContainer>
    </DragDropContext>
  );
};

const ColumnContainer = styled(DropChild)`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
