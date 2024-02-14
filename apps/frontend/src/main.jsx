import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GamesProvider } from "./context/GamesContext.jsx";
import { GameNestApp } from "./GameNestApp";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GamesProvider>
        <GameNestApp />
      </GamesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
