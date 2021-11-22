import { useEffect } from "react";
import { useAsync } from "./useAsync";
import { Project } from "../screens/project-list/list";
import { cleanObject } from "./index";
import { useHttp } from "./http";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, setRetry, ...result } = useAsync<Project[]>();

  useEffect(() => {
    run(
      client("projects", {
        data: cleanObject(param || {}),
      })
    );
    setRetry(() => () => {
      run(
        client("projects", {
          data: cleanObject(param || {}),
        })
      );
    });
  }, [param, client, run, setRetry]);

  return result;
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
