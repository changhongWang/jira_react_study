import React from "react";
import { useUndo } from "../utils/useUndo";

export const TestUndo = () => {
  const { state, undo, canUndo, redo, canRedo, clear, changePresent } =
    useUndo(0);
  const { present } = state;
  return (
    <div>
      <h1>当前值：{present}</h1>
      <div
        style={{
          width: "220px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button onClick={undo} disabled={!canUndo}>
          后退
        </button>
        <button
          onClick={() => {
            changePresent(present - 1);
          }}
        >
          -
        </button>
        <button onClick={clear}>清空</button>
        <button
          onClick={() => {
            changePresent(present + 1);
          }}
        >
          +
        </button>
        <button onClick={redo} disabled={!canRedo}>
          前进
        </button>
      </div>
    </div>
  );
};
