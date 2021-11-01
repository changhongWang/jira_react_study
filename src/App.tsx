import React from "react";
import logo from "./logo.svg";
import AuthenticatedApp from "./authenticated-app";
import UnAuthenticatedApp from "./unauthenticated-app";
import { useAuth } from "./context/auth-context";
import "./App.css";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </div>
  );
}

export default App;
