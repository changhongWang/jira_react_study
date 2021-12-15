import { render, screen } from "@testing-library/react";
import { Mark } from "../components/mark";

test("Mark组件正确渲染关键字", () => {
  const text = "物料管理";
  const keyword = "物料";

  render(<Mark name={text} keyword={keyword} />);

  expect(screen.getByText(keyword)).toBeInTheDocument();
  expect(screen.getByText(keyword)).toHaveStyle("color: #257AFD");
  expect(screen.getByText("管理")).not.toHaveStyle("color: #257AFD");
});
