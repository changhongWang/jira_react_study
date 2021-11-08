import React, { FormEvent, useContext } from "react";
import { Divider, Button, Form, Input } from "antd";
import { useAuth } from "../context/auth-context";

const RegisterScreen = (props: any) => {
  const { register } = useAuth();

  const handleRegister = (values: { username: string; password: string }) => {
    register(values);
  };

  return (
    <>
      <h3>注册</h3>
      <Divider />
      <Form onFinish={handleRegister}>
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: "请输入用户名",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: "请输入密码",
            },
          ]}
        >
          <Input.Password type="password" placeholder="密码" id="password" />
        </Form.Item>
        <div>
          <Button type="primary" htmlType="submit">
            注册并登录
          </Button>
        </div>
      </Form>
    </>
  );
};

export default RegisterScreen;
