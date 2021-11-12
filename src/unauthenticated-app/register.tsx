import { Divider, Form, Input } from "antd";
import { useAuth } from "../context/auth-context";
import { LongButton } from "./index";
import { useAsync } from "../utils/useAsync";

const RegisterScreen = ({ onError }: { onError: (e: Error) => void }) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, {
    throwOnError: true,
  });

  const handleRegister = async ({
    c_password,
    ...values
  }: {
    username: string;
    password: string;
    c_password: string;
  }) => {
    // 确认密码逻辑
    if (c_password !== values.password) {
      onError(new Error("确认密码与密码不同"));
      return;
    }
    try {
      await run(register(values));
    } catch (e) {
      onError(e as Error);
    }
  };

  return (
    <>
      <h3>注册</h3>
      <Divider />
      <Form onFinish={handleRegister}>
        <Form.Item
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
        <Form.Item
          name="c_password"
          rules={[
            {
              required: true,
              message: "请确认密码",
            },
          ]}
        >
          <Input.Password
            type="password"
            placeholder="确认密码"
            id="c_password"
          />
        </Form.Item>
        <div>
          <LongButton loading={isLoading} type="primary" htmlType="submit">
            注册并登录
          </LongButton>
        </div>
      </Form>
    </>
  );
};

export default RegisterScreen;
