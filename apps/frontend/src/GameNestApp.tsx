import { lazy, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { CollectionProvider } from "./context/CollectionContext.jsx";
import { CollectionManager } from "./components/collection/manager/CollectionManager.tsx";
import { ValidationPage } from "./pages/ValidationPage.tsx";
import { ErrorPage } from "./pages/ErrorPage.tsx";
import { useAuth } from "./context/AuthContext.tsx";
import { MyListsPage } from "./pages/MyListsPage.tsx";
import { ListAdd } from "./components/lists/manager/add/ListAdd.tsx";
import { ListUpdate } from "./components/lists/manager/update/ListUpdate.tsx";
import { AuthStatus } from "./types/auth.ts";


interface UseAuthProps  {
  accessToken: string;
  authStatus: AuthStatus
}

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

  const ListsPage = lazy(() =>
    import("./pages/ListsPage.tsx").then((module) => ({
      default: module.ListsPage,
    })),
  );

  const ListDetailsPage = lazy(() =>
    import("./components/lists/details/ListDetailsPage.tsx").then((module) => ({
      default: module.ListDetailsPage,
    })),
  );

  const { accessToken, authStatus } = useAuth() as UseAuthProps;

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
    {
      id: 7,
      path: "/lists",
      element: <ListsPage />,
    },
    {
      id: 8,
      path: "/lists/:listId",
      element: <ListDetailsPage />,
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
    {
      id: 8,
      path: "/user/lists",
      element: <MyListsPage />,
    },
    {
      id: 9,
      path: "/lists/add",
      element: <ListAdd />,
    },
    {
      id: 10,
      path: "/lists/update/:id",
      element: <ListUpdate />,
    },
  ];

  return (
    <>
      {/* //* Suspense: let display a "loader" (fallback) until the component finishes its load.  */}
      <Suspense fallback={""}>
        <Routes>
          <Route
            element={<ProtectedRoute isAllowed={accessToken ? false : true} authStatus={authStatus} redirectTo="/404" />}
          >
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/user/validate/:token" element={<ValidationPage />} />
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
            element={<ProtectedRoute isAllowed={accessToken ? true : false} authStatus={authStatus} redirectTo="/login" />}
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
