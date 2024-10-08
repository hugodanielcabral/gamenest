import { lazy, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { CollectionProvider } from "./context/CollectionContext.jsx";
import { CollectionManager } from "./components/collection/manager/CollectionManager.tsx";
import { ValidationPage } from "./pages/ValidationPage.tsx";
import { ErrorPage } from "./pages/ErrorPage.tsx";
import { useAuth } from "./context/AuthContext.jsx";

export const GameNestApp = () => {
  //* Lazy: let "lazy" load the components when the user needs it.
  const HomePage = lazy(() => import("./pages/HomePage.tsx"));
  const GamesFinderPage = lazy(() => import("./pages/GamesFinderPage.tsx"));
  const GameDetails = lazy(() =>
    import("./components/games/details/GameDetails.tsx").then((module) => ({
      default: module.GameDetails,
    })),
  );
  const CollectionGamePage = lazy(() =>
    import("./pages/CollectionGamePage.tsx").then((module) => ({
      default: module.CollectionGamePage,
    })),
  );

  const CollectionPage = lazy(() =>
    import("./pages/CollectionPage.tsx").then((module) => ({
      default: module.CollectionPage,
    })),
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
      element: <GamesFinderPage />,
    },
    {
      id: 3,
      path: "/games/:gameId",
      element: <GameDetails />,
    },
    {
      id: 6,
      path: "*",
      element: <ErrorPage />,
    },
  ];

  const privateRoutes = [
    {
      id: 1,
      path: "/",
      element: <HomePage />,
    },
    {
      id: 2,
      path: "/collection",
      element: <CollectionPage />,
    },
    {
      id: 3,
      path: "/collection/add/:gameSlug",
      element: <CollectionManager />,
    },
    {
      id: 5,
      path: "/collection/update/:gameSlug",
      element: <CollectionManager />,
    },
    {
      id: 6,
      path: "*",
      element: <ErrorPage />,
    },
    {
      id: 7,
      path: "/collection/:gameSlug",
      element: <CollectionGamePage />,
    },
  ];

  return (
    <>
      {/* //* Suspense: let display a "loader" (fallback) until the component finishes its load.  */}
      <Suspense fallback={""}>
          <Routes>
            <Route
              element={
                <ProtectedRoute isAllowed={!isAuth} redirectTo="/error" />
              }
            >
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/user/validate/:token"
                element={<ValidationPage />}
              />
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
              element={
                <ProtectedRoute isAllowed={isAuth} redirectTo="/error" />
              }
            >
              <Route
                element={
                  <CollectionProvider>
                    <Outlet />
                  </CollectionProvider>
                }
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
            </Route>
          </Routes>
      </Suspense>
    </>
  );
};
