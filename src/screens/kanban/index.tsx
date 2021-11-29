import React from "react";
import { useDocumentTitle } from "../../utils";
import { useKanbans } from "../../utils/kanban";
import { useKanbanSearchParams, useProjectInUrl } from "./util";
import { KanbanColumn } from "./KanbanColumn";
import styled from "@emotion/styled";
import { SearchPanel } from "./SearchPanel";
import { ScreenContainer } from "../../components/lib";

export const Kanban = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnContainer>
        {kanbans?.map((kanban) => {
          return <KanbanColumn kanban={kanban} key={kanban.id} />;
        })}
      </ColumnContainer>
    </ScreenContainer>
  );
};

const ColumnContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
