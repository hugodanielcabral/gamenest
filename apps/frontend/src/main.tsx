import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
AuthProvider;
import { GameNestApp } from "./GameNestApp";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";
import "@fontsource/roboto";
import { SkeletonTheme } from "react-loading-skeleton";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <GameNestApp />
        </SkeletonTheme>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
