import { Layout } from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { GamesPage } from "./pages/GamesPage";

export const GameNestApp = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GamesPage />} />
      </Routes>
    </Layout>
  );
};
