import styled from "@emotion/styled";
import { Divider, Popover, Typography } from "antd";
import { List } from "antd";
import { useProjectModal } from "../screens/project-list/util";
import { useProjects } from "../utils/project";
import { NoPaddingButton } from "./lib";

export const ProjectPopOver = () => {
  const { data: projects, refetch } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin) || [];
  const { open } = useProjectModal();

  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinnedProjects.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <NoPaddingButton type="link" onClick={open}>
        创建项目
      </NoPaddingButton>
    </ContentContainer>
  );

  return (
    <Popover
      onVisibleChange={() => refetch()}
      placement="bottom"
      content={content}
    >
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
