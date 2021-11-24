import { useCallback, useState, useReducer } from "react";

const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESET";

type State<T> = {
  prev: T[];
  present: T;
  future: T[];
};

type Action<T> = {
  newPresent?: T;
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
};

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { prev, present, future } = state;
  const { newPresent, type } = action;

  switch (type) {
    case UNDO: {
      if (prev.length === 0) {
        throw new Error("无法回退");
      }
      const previous = prev[prev.length - 1];
      const newPrev = prev.slice(0, prev.length - 1);
      return {
        prev: newPrev,
        present: previous,
        future: [present, ...future],
      };
    }

    case REDO: {
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
    }

    case RESET: {
      return {
        ...state,
        prev: [],
        future: [],
      };
    }
    case SET: {
      if (newPresent === present || !newPresent) {
        return state;
      }
      return {
        prev: [...prev, present],
        present: newPresent,
        future: [],
      };
    }
  }
};

export const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    prev: [],
    present: initialPresent,
    future: [],
  } as State<T>);

  // 可回退/前进
  const canUndo = state.prev.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => {
    dispatch({ type: "UNDO" });
  }, [state]);

  const redo = useCallback(() => {
    dispatch({ type: "REDO" });
  }, []);

  // 清空
  const clear = useCallback(() => {
    dispatch({ type: "RESET" });
  }, [state]);

  // 改变当前值
  const changePresent = useCallback((val: T) => {
    dispatch({ type: "SET", newPresent: val });
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
