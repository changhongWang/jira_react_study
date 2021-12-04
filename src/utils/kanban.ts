import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { Kanban } from "../types/kanban";
import {
  useAddConfig,
  useDeleteConfig,
  useReorderConfig,
} from "./useOptimisticOptions";

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Kanban>) =>
      client("kanbans", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`kanbans/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export type SortParams = {
  // 要重新排序的itemId
  fromId: number;
  // 目标id
  referenceId: number;
  // 放在目标item的前面还是后面
  type: "before" | "after";
  fromKanbanId?: number;
  toKanbanId?: number;
};
export const useReorderKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation((params: SortParams) => {
    return client("kanbans/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderConfig(queryKey));
};
