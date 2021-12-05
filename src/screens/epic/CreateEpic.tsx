import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Drawer, DrawerProps, Form, Spin, Input, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "../../components/lib";
import { useEpicsQueryKey } from "./util";
import { useProjectIdInUrl } from "../kanban/util";
import { useAddEpic } from "../../utils/epic";

export const CreateEpic = (
  props: Pick<DrawerProps, "visible"> & { onClose: () => void }
) => {
  const { mutate: addEpic, isLoading, error } = useAddEpic(useEpicsQueryKey());
  const [form] = useForm();
  const projectId = useProjectIdInUrl();

  useEffect(() => {
    form.resetFields();
  }, [form, props.visible]);

  const onFinish = async (values: any) => {
    await addEpic({ ...values, projectId: projectId });
    props.onClose();
  };
  return (
    <Drawer
      visible={props.visible}
      onClose={props.onClose}
      forceRender={true}
      destroyOnClose={true}
      width="100%"
    >
      <Container>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <>
            <h1>创建任务组</h1>
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
                rules={[{ required: true, message: "请输入任务组名" }]}
              >
                <Input placeholder="请输入任务组名" />
              </Form.Item>
              <Form.Item style={{ textAlign: "center" }}>
                <Button loading={isLoading} type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
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
