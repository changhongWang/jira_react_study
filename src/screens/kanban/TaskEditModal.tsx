import { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useDeleteTask, useEditTask } from "../../utils/task";
import { useTaskModal, useTasksQueryKey } from "./util";
import { UserSelect } from "../../components/userSelect";
import { TaskTypeSelect } from "../../components/TaskTypeSelect";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const TaskEditModal = () => {
  const [form] = useForm();
  const { close, editingTask, editingTaskId } = useTaskModal();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );
  const onCancel = () => {
    close();
    form.resetFields();
  };
  const onOk = async () => {
    await editTask({
      ...editingTask,
      ...form.getFieldsValue(),
    });
    close();
  };
  const { mutateAsync: deleteTask } = useDeleteTask(useTasksQueryKey());

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [editingTask, form]);
  return (
    <Modal
      forceRender={true}
      onCancel={onCancel}
      onOk={onOk}
      okText="确认"
      cancelText="取消"
      confirmLoading={editLoading}
      title="编辑任务"
      visible={!!editingTaskId}
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <Form.Item
          label="任务名"
          name="name"
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="经办人" name="processorId">
          <UserSelect defaultOptionName="经办人" />
        </Form.Item>
        <Form.Item label="类型" name="typeId">
          <TaskTypeSelect />
        </Form.Item>
      </Form>
      <Button
        size="small"
        style={{ fontSize: "14px" }}
        onClick={() => {
          Modal.confirm({
            title: "确定删除该项？",
            content: "点击确定删除",
            okText: "确定",
            cancelText: "取消",
            onOk: () => {
              deleteTask({ id: Number(editingTaskId) });
            },
          });
        }}
      >
        删除
      </Button>
    </Modal>
  );
};
