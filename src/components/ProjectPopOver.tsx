import styled from "@emotion/styled";
import { Divider, Popover, Typography } from "antd";
import { List } from "antd";
import React from "react";
import { useProjects } from "../utils/project";
import { useDispatch } from "react-redux";
import { NoPaddingButton } from "./lib";
import { projectListActions } from "../screens/project-list/projectList.slice";

export const ProjectPopOver = () => {
  const dispatch = useDispatch();
  const { data: projects } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin) || [];

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
      <NoPaddingButton
        onClick={() => dispatch(projectListActions.openProjectModal)}
        type="link"
      >
        创建项目
      </NoPaddingButton>
    </ContentContainer>
  );

  return (
    <Popover placement="bottom" content={content}>
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
