/*
 * @Description:
 * @Author: changhong.wang
 * @Date: 2021-10-26 16:47:41
 * @LastEditors: changhong.wang
 * @LastEditTime: 2021-10-26 16:50:46
 */
const debounce = (func, delay) => {
  let timeout;
  return () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(function () {
      func();
    }, delay);
  };
};

const log = debounce(() => {
  console.log("call");
}, 5000);

log();
log();
log();
