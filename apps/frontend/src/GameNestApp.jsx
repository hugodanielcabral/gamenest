import { Layout } from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";
import { HomePage, GamesPage } from "./pages/index.js";
import { GameDetails } from "./components/games/gamedetails/GameDetails";

export const GameNestApp = () => {
  const publicRoutes = [
    {
      id: 1,
      path: "/",
      element: <HomePage />,
    },
    {
      id: 2,
      path: "/games",
      element: <GamesPage />,
    },
    {
      id: 3,
      path: "/games/:gameId",
      element: <GameDetails />,
    },
  ];

  return (
    <Layout>
      <Routes>
        {publicRoutes.map((route) => {
          return (
            <Route key={route.id} path={route.path} element={route.element} />
          );
        })}
      </Routes>
    </Layout>
  );
};
