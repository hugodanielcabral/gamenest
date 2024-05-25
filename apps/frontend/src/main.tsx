import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
AuthProvider
import { GameNestApp } from "./GameNestApp";
import "./index.css";
import "@fontsource/roboto";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GameNestApp />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
