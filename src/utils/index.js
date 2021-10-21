/*
 * @Description:
 * @Author: changhong.wang
 * @Date: 2021-10-21 15:58:48
 * @LastEditors: changhong.wang
 * @LastEditTime: 2021-10-21 17:02:57
 */
import { useEffect } from "react";

export const isFalsy = (val) => (val === 0 ? false : !val);
export const cleanObject = (obj) => {
  // 在一个函数里，改变传入的函数对象本身是不好的，不要污染传入的对象
  const res = { ...obj };
  Object.keys(res).forEach((key) => {
    const value = res[key];
    console.log(key, value);
    if (isFalsy(value)) {
      delete res[key];
    }
  });
  return res;
};

// 自定义Hook
export const useMount = () => {
  useEffect((callback) => {
    callback();
  }, []);
};
