/*
 * @Description:
 * @Author: changhong.wang
 * @Date: 2021-10-21 11:34:56
 * @LastEditors: changhong.wang
 * @LastEditTime: 2021-10-26 19:34:46
 */
export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
}

interface SearchProps {
  param: {
    name: string;
    personId: string;
  };
  setParam: (params: SearchProps["param"]) => void;
  userList: User[];
}

export const SearchPanel = ({ param, setParam, userList }: SearchProps) => {
  return (
    <form>
      <input
        type="text"
        value={param.name}
        onChange={(e) =>
          setParam({
            ...param,
            name: e.target.value,
          })
        }
      />
      <select
        value={param.personId}
        onChange={(e) => {
          console.log(e.target.value);
          setParam({
            ...param,
            personId: e.target.value,
          });
        }}
      >
        <option value={""}>负责人</option>
        {userList.map((user) => {
          return (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          );
        })}
      </select>
    </form>
  );
};
