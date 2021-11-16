import { Button } from "antd";
import React from "react";
import { Routes, Route } from "react-router";
import { Link } from "react-router-dom";
import { Epic } from "../epic";
import { Kanban } from "../kanban";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>Project Screen</h1>
      <Link to="kanban">看板</Link>
      <Link to="epic">任务组</Link>
      <Routes>
        <Route path="kanban" element={<Kanban />}></Route>
        <Route path="epic" element={<Epic />}></Route>
        <Route index element={<Kanban />} />
      </Routes>
    </div>
  );
};
