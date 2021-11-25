import { useEffect } from "react";
import { useAsync } from "./useAsync";
import { Project } from "../screens/project-list/list";
import { cleanObject } from "./index";
import { useHttp } from "./http";
import { useQuery } from "react-query";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );
};

// client(`projects/${params.id}`, {
export const useEditProject = () => {
  const client = useHttp();
  const { run, ...asyncResult } = useAsync();

  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };

  return {
    mutate,
    ...asyncResult,
  };
};

export const useAddProject = () => {
  const client = useHttp();
  const { run, ...asyncResult } = useAsync();

  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };

  return {
    mutate,
    ...asyncResult,
  };
};
