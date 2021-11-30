import { Input } from "antd";
import { useState } from "react";
import { useAddKanban } from "../../utils/kanban";
import { Container } from "./KanbanColumn";
import { useKanbansQueryKey, useProjectIdInUrl } from "./util";

export const CreateKanban = () => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addKanban } = useAddKanban(useKanbansQueryKey());

  const submit = async () => {
    await addKanban({ name, projectId });
    setName("");
  };
  return (
    <Container>
      <Input
        value={name}
        placeholder="新建看板名称"
        onPressEnter={submit}
        onChange={(e) => setName(e.target.value)}
      />
    </Container>
  );
};
