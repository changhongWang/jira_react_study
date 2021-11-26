import React, { useEffect } from "react";
import { Button, Drawer, Spin } from "antd";
import { useProjectModal, useProjectQueryKey } from "./util";
import { Form, Input } from "antd";
import { UserSelect } from "../../components/userSelect";
import { useAddProject, useEditProject } from "../../utils/project";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "../../components/lib";
import styled from "@emotion/styled";

export const ProjectModal = () => {
  const { projectModalOpen, close, isLoading, editingProject } =
    useProjectModal();
  const title = editingProject ? "编辑项目" : "创建项目";
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutateProject(useProjectQueryKey());
  const [form] = useForm();
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };
  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);
  return (
    <Drawer
      forceRender={true}
      onClose={close}
      visible={projectModalOpen}
      width="100%"
    >
      <Container>
        {isLoading ? <Spin size="large" /> : null}
        <h1>{title}</h1>
        <ErrorBox error={error} />
        <Form
          form={form}
          layout="vertical"
          style={{ width: "40rem" }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: "请输入项目名称" }]}
          >
            <Input placeholder="请输入项目名称" />
          </Form.Item>
          <Form.Item
            name="organization"
            label="部门"
            rules={[{ required: true, message: "请输入部门名" }]}
          >
            <Input placeholder="请输入部门名" />
          </Form.Item>
          <Form.Item name="personId" label="负责人">
            <UserSelect defaultOptionName="负责人" />
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <Button loading={mutateLoading} type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
