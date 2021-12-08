// mock
import { setupServer } from "msw/node";
import { rest } from "msw";
import { http } from "../utils/http";

const apiUrl = process.env.REACT_APP_API_URL;

const server = setupServer();

// jest是对react最友好的一个测试库
// beforeAll是jest里提供的方法, 代表执行所有的测试之前，先来执行一下回调函数
beforeAll(() => server.listen());

// 每一个测试跑完以后，都重置mock路由
afterEach(() => server.resetHandlers());

// 所有的测试跑完后，关闭mock路由
afterAll(() => server.close());

test("http方法发送异步请求", async () => {
  const endPoint = "test-endpoint";
  const mockResult = { mockValue: "mock" };

  server.use(
    rest.get(`${apiUrl}/${endPoint}`, (req, res, ctx) =>
      res(ctx.json(mockResult))
    )
  );

  const result = await http(endPoint);
  expect(result).toEqual(mockResult);
});
