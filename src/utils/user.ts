import { useEffect } from "react";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";
import { cleanObject } from "./index";
import { User } from "../screens/project-list/SearchPanel";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();
  useEffect(() => {
    run(
      client("users", {
        data: cleanObject(param || {}),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
