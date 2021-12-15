/*
 * @Description:
 * @Author: changhong.wang
 * @Date: 2021-10-21 15:58:48
 * @LastEditors: changhong.wang
 * @LastEditTime: 2021-10-27 07:07:19
 */
import { useEffect, useState, useRef } from "react";

export const isFalsy = (val: unknown) => (val === 0 ? false : !val);

export const isVoid = (val: unknown) =>
  val === undefined || val === null || val === "";

export const cleanObject = (obj?: { [key: string]: unknown }) => {
  if (!obj) {
    return {};
  }
  // 在一个函数里，改变传入的函数对象本身是不好的，不要污染传入的对象
  const res = { ...obj };
  Object.keys(res).forEach((key) => {
    const value = res[key];
    if (isVoid(value)) {
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
    // Todo 这里依赖项如果加上callback会有问题，造成无限循环；与useCallback和useMemo有关
  }, [callback]);
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

/**
 * 改变文档标题hooks
 * @param title 需要改变的文档标题
 * @param keepOnUnmount 是否需要在页面unmount时保留当前文档标题
 */
export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  const originTitle = useRef(document.title).current;
  useEffect(() => {
    document.title = title;
  }, [title]);
  useEffect(() => {
    return () => {
      !keepOnUnmount && (document.title = originTitle);
    };
  }, [keepOnUnmount, originTitle]);
};

// 重置路由
export const resetRoute = () => {
  window.location.href = window.location.origin;
};

/**
 * 返回组件的挂载状态，如果组件还没挂载的话 返回false; 反之返回true
 */
export const useMountedRef = () => {
  let mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });
  return mountedRef;
};
