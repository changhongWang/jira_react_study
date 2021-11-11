import { Divider, Form, Input } from "antd";
import { useAuth } from "../context/auth-context";
import { LongButton } from "./index";

const LoginScreen = (props: any) => {
  const { login } = useAuth();

  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
  };

  return (
    <>
      <h3>登录</h3>
      <Divider />
      <Form onFinish={handleSubmit}>
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
          <LongButton type="primary" htmlType="submit">
            登录
          </LongButton>
        </div>
      </Form>
    </>
  );
};

export default LoginScreen;
