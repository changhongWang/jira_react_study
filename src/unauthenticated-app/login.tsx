import { Divider, Form, Input } from "antd";
import { useAuth } from "../context/auth-context";
import { LongButton } from "./index";
import { useAsync } from "../utils/useAsync";

// 登录
const LoginScreen = (props: any) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, {
    throwOnError: true,
  });

  // 处理登录提交后
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(values));
    } catch (e) {
      props.onError(e);
    }
  };

  return (
    <>
      <h3>登录</h3>
      <Divider />
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "请输入用户名",
            },
          ]}
        >
          <Input placeholder="用户名" />
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
        <div>
          <LongButton loading={isLoading} type="primary" htmlType="submit">
            登录
          </LongButton>
        </div>
      </Form>
    </>
  );
};

export default LoginScreen;
