import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { Task } from "../types/task";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
  useReorderConfig,
} from "./useOptimisticOptions";
import { useDebounce } from ".";
import { SortParams } from "./kanban";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  const deboucedParam = { ...param, name: useDebounce(param?.name, 200) };

  return useQuery<Task[]>(["tasks", deboucedParam], () =>
    client("tasks", { data: deboucedParam })
  );
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      client("tasks", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

// 根据单个id查task
export const useTask = (id: number) => {
  const client = useHttp();
  return useQuery<Task>(["task", { id }], () => client(`tasks/${id}`), {
    enabled: !!id,
  });
};

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`tasks/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useReorderTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation((params: SortParams) => {
    return client("tasks/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderConfig(queryKey));
};
