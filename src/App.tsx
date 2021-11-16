import React from "react";
import AuthenticatedApp from "./authenticated-app";
import UnAuthenticatedApp from "./unauthenticated-app";
import { useAuth } from "./context/auth-context";
import { ErrorBoundary } from "./components/ErrorBoundary";
import "./App.css";
import { FullPageErrorFallback } from "./components/lib";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
