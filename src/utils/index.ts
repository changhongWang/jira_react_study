/*
 * @Description:
 * @Author: changhong.wang
 * @Date: 2021-10-21 15:58:48
 * @LastEditors: changhong.wang
 * @LastEditTime: 2021-10-27 07:07:19
 */
import { useEffect, useState } from "react";

export const isFalsy = (val: number) => (val === 0 ? false : !val);
export const cleanObject = (obj: object) => {
  // 在一个函数里，改变传入的函数对象本身是不好的，不要污染传入的对象
  const res = { ...obj };
  Object.keys(res).forEach((key) => {
    // @ts-ignore
    const value = res[key];
    console.log(key, value);
    if (isFalsy(value)) {
      // @ts-ignore
      delete res[key];
    }
  });
  return res;
};

// 直接export function - 带泛型
// export function testMode<S>(type: S): [S] {
//   return [type];
// };

// 箭头函数写法 - 带泛型
export const testMode = <S>(type: S): [S] => {
  return [type];
};

// 自定义Hook
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [res, setRes] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setRes(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return res;
};

export const useArray = <P>(persons: P[]) => {
  // hello，请把作业写在这里吧，写完记得再对照作业要求检查一下
  const [personList, setPersonList] = useState<P[]>(persons);
  return {
    value: personList,
    clear: () => {
      setPersonList([]);
    },
    removeIndex: (index: number) => {
      // 根据指定index 删除
      const newPerson = [...personList];
      newPerson.splice(index, 1);
      console.log(newPerson, personList);
      setPersonList(newPerson);
    },
    add: (item: P) => {
      setPersonList([...personList, item]);
    },
  };
};
