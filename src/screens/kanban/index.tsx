import React from "react";
import { Spin } from "antd";
import styled from "@emotion/styled";
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
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <ColumnContainer>
          {kanbans?.map((kanban) => {
            return <KanbanColumn kanban={kanban} key={kanban.id} />;
          })}
          <CreateKanban />
        </ColumnContainer>
      )}
      <TaskEditModal />
    </ScreenContainer>
  );
};

const ColumnContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
