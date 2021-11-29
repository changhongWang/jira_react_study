import React from "react";
import { useTaskTypes } from "../utils/taskType";
import IDSelect from "./IDSelect";

export const TaskTypeSelect = (
  props: React.ComponentProps<typeof IDSelect>
) => {
  const { data: taskTypes } = useTaskTypes();
  return <IDSelect options={taskTypes || []} {...props} />;
};
