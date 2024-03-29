import { lazy, Suspense } from "react";
import { Layout } from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";
import { CollectionPage } from "./pages/CollectionPage.jsx";
import { RegisterPage } from "./pages/RegisterPage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { NotFound } from "./components/notfound/NotFound.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { useAuth } from "./context/AuthContext.jsx";

export const GameNestApp = () => {
  //* Lazy: let "lazy" load the components when the user needs it.
  const HomePage = lazy(() => import("./pages/HomePage.jsx"));
  const GamesPage = lazy(() => import("./pages/GamesPage.jsx"));
  const GameDetails = lazy(() =>
    import("./components/games/gamedetails/GameDetails").then((module) => ({
      default: module.GameDetails,
    }))
  );

  const { isAuth } = useAuth();

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
      id: 6,
      path: "*",
      element: <NotFound message="Oops" />,
    },
  ];

  const privateRoutes = [
    {
      id: 1,
      path: "/collection",
      element: <CollectionPage />,
    },
    {
      id: 2,
      path: "/collection/add",
      element: <h1>Soon</h1>,
    },
    {
      id: 3,
      path: "/",
      element: <HomePage />,
    },
  ];

  return (
    <Layout>
      {/* //* Suspense: let display a "loader" (fallback) until the component finishes its load.  */}
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route
            element={<ProtectedRoute isAllowed={!isAuth} redirectTo="/" />}
          >
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route>
            {publicRoutes.map((route) => {
              return (
                <Route
                  key={route.id}
                  path={route.path}
                  element={route.element}
                />
              );
            })}
          </Route>
          <Route
            element={<ProtectedRoute isAllowed={isAuth} redirectTo="/login" />}
          >
            {privateRoutes.map((route) => {
              return (
                <Route
                  key={route.id}
                  path={route.path}
                  element={route.element}
                />
              );
            })}
          </Route>
        </Routes>
      </Suspense>
    </Layout>
  );
};
