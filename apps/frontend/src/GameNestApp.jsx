import { Layout } from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";

export const GameNestApp = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Layout>
  );
};
