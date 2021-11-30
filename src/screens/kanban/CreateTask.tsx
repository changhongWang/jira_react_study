import { Card, Input } from "antd";
import { useState, useEffect } from "react";
import { useAddTask } from "../../utils/task";
import { useProjectIdInUrl, useTasksQueryKey } from "./util";

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState("");
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());
  const projectId = useProjectIdInUrl();
  const [inputMode, setInputMode] = useState(false);

  const submit = async () => {
    await addTask({ kanbanId, projectId, name });
    setInputMode(false);
    setName("");
  };
  const toggle = () => setInputMode(!inputMode);

  useEffect(() => {
    !inputMode && setName("");
  }, [inputMode]);

  if (!inputMode) {
    return <div onClick={toggle}>+创建事务</div>;
  }
  return (
    <Card>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        onPressEnter={submit}
        onBlur={toggle}
        placeholder="需要做些什么?"
        autoFocus={true}
      />
    </Card>
  );
};
