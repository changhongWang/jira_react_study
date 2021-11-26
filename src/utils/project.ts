import { Project } from "../screens/project-list/list";
import { useHttp } from "./http";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useProjectSearchParams } from "../screens/project-list/util";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );
};

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  const [searchParams] = useProjectSearchParams();
  const queryKey = ["projects", searchParams];
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
      async onMutate(target) {
        const previousItems = queryClient.getQueryData(queryKey, {
          exact: false,
        });
        queryClient.setQueryData(queryKey, (old?: Project[]) => {
          console.log(previousItems, target, old, 989);
          return (
            old?.map((project) =>
              project.id === target.id
                ? {
                    ...project,
                    ...target,
                  }
                : project
            ) || []
          );
        });

        return {
          previousItems,
        };
      },
      onError(error, newItem, context) {
        queryClient.setQueryData(
          queryKey,
          (context as { previousItem: Project[] }).previousItem
        );
      },
    }
  );
};

export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client("projects", {
        data: params,
        method: "POST",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

// 根据单个id查project
export const useProject = (id: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id,
    }
  );
};
