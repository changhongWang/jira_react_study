import { Button, Input } from "antd";
import { useSetUrlSearchParams } from "../../utils/url";
import { useTasksSearchParams } from "./util";
import { Row } from "../../components/lib";
import { UserSelect } from "../../components/userSelect";
import { TaskTypeSelect } from "../../components/TaskTypeSelect";

export const SearchPanel = () => {
  const searchParams = useTasksSearchParams();
  const setSearchParams = useSetUrlSearchParams();
  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };
  return (
    <Row marginBottom={2} gap={true}>
      <Input
        style={{ width: "20rem" }}
        placeholder="任务名"
        value={searchParams.name}
        onChange={(e) => {
          setSearchParams({ name: e.target.value });
        }}
      />
      <UserSelect
        defaultOptionName="经办人"
        value={searchParams.processorId}
        onChange={(val) => {
          setSearchParams({ processorId: val });
        }}
      />
      <TaskTypeSelect
        defaultOptionName="类型"
        value={searchParams.typeId}
        onChange={(val) => {
          setSearchParams({ typeId: val });
        }}
      />
      <Button onClick={reset}>清空</Button>
    </Row>
  );
};
