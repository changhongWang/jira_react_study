import { useMemo } from "react";
import { useProject } from "../../utils/project";
import { useUrlQueryParam } from "../../utils/url";

export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => {
    setProjectCreate({ projectCreate: undefined });
    editingProjectId && setEditingProjectId({ editingProjectId: undefined });
  };
  const startEdit = (id: number) =>
    setEditingProjectId({
      editingProjectId: id,
    });

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    editingProject,
    startEdit,
    isLoading,
  } as const;
};
