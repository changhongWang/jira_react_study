import { useQuery } from "react-query";
import { useHttp } from "./http";
import { TaskType } from "../types/taskType";

export const useTaskTypes = () => {
  const client = useHttp();

  return useQuery<TaskType[]>(["taskTypes"], () => client("taskTypes"));
};
