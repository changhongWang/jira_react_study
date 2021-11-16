import React, { useState, useEffect } from "react";

// 这里展现的是React Hook和闭包，也是React Hook和闭包之间经典的坑，使用Hook迟早会面临
export default function Test() {
  const [times, setTimes] = useState<number>(0);
  useEffect(() => {
    console.log("first次数", times);
  }, [times]);

  console.log("times9", times);
  useEffect(() => {
    console.log(times);
    return () => {
      console.log("unload时次数:", times);
    };
  }, []);
  return (
    <div>
      点击button次数: {times}
      <button
        onClick={() => {
          setTimes(times + 1);
        }}
      >
        按钮
      </button>
    </div>
  );
}
