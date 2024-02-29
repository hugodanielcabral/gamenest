import { lazy, Suspense } from "react";
import { Layout } from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";
import { CollectionPage } from "./pages/CollectionPage.jsx";
import { NewCollection } from "./components/collection/creation/NewCollection.jsx";

export const GameNestApp = () => {
  //* Lazy: let "lazy" load the components when the user needs it.
  const HomePage = lazy(() => import("./pages/HomePage.jsx"));
  const GamesPage = lazy(() => import("./pages/GamesPage.jsx"));
  const GameDetails = lazy(() =>
    import("./components/games/gamedetails/GameDetails").then((module) => ({
      default: module.GameDetails,
    }))
  );

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
    {
      id: 4,
      path: "/collection",
      element: <CollectionPage />,
    },
    {
      id: 5,
      path: "/collection/new",
      element: <NewCollection />,
    },
  ];

  return (
    <Layout>
      {/* //* Suspense: let display a "loader" (fallback) until the component finishes its load.  */}
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          {publicRoutes.map((route) => {
            return (
              <Route key={route.id} path={route.path} element={route.element} />
            );
          })}
        </Routes>
      </Suspense>
    </Layout>
  );
};
