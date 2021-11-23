import { useCallback, useState } from "react";

export const useUndo = <T>(initialPresent: T) => {
  const [state, setState] = useState<{
    prev: T[];
    present: T;
    future: T[];
  }>({
    prev: [],
    present: initialPresent,
    future: [],
  });

  // 可回退/前进
  const canUndo = state.prev.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => {
    setState((currState) => {
      const { prev, present, future } = currState;
      if (prev.length === 0) {
        throw new Error("无法回退");
      }
      const previous = prev[prev.length - 1];
      const newPrev = prev.slice(0, prev.length - 1);
      console.log({
        prev: newPrev,
        present: previous,
        future: [present, ...future],
      });
      return {
        prev: newPrev,
        present: previous,
        future: [present, ...future],
      };
    });
  }, [state]);

  const redo = useCallback(() => {
    setState((currState) => {
      const { prev, present, future } = currState;
      if (future.length === 0) {
        throw new Error("无法前进");
      }
      const newFuture = future.slice(1, future.length - 1);
      const next = future[0];
      return {
        prev: [...prev, present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  // 清空
  const clear = useCallback(() => {
    setState({
      ...state,
      prev: [],
      future: [],
    });
  }, [state]);

  // 改变当前值
  const changePresent = useCallback((val: T) => {
    setState((currState) => {
      const { prev, present } = currState;
      if (val === present) {
        return currState;
      }
      console.log({
        prev: [...prev, present],
        present: val,
        future: [],
      });
      return {
        prev: [...prev, present],
        present: val,
        future: [],
      };
    });
  }, []);

  return {
    state,
    undo,
    canUndo,
    redo,
    canRedo,
    clear,
    changePresent,
  };
};
