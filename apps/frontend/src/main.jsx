import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { GameNestApp } from "./GameNestApp";
import { GamesProvider } from "./context/GamesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GamesProvider>
        <GameNestApp />
      </GamesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
