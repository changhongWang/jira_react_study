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

// 自定义Hook
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = (value: any, delay?: number) => {
  const [res, setRes] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setRes(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return res;
};
