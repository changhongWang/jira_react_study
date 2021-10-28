import React from "react";
import logo from "./logo.svg";
import { TsReactTest } from "./try-use-array";
import ProjectListScreen from "./screens/project-list";
import { LoginScreen } from "./screens/login";
import "./App.css";

function App() {
  return (
    <div className="App">
      <LoginScreen />
      {/*<ProjectListScreen />*/}
    </div>
  );
}

export default App;
