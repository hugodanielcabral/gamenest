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
import HomePage from "./pages/HomePage.tsx";
import GamesFinderPage from "./pages/GamesFinderPage.tsx";
import { GameDetails } from "./components/games/details/GameDetails.tsx";
import { ListsPage } from "./pages/ListsPage.tsx";
import { ListDetailsPage } from "./components/lists/details/ListDetailsPage.tsx";
import { CollectionPage } from "./pages/CollectionPage.tsx";
import { CollectionGamePage } from "./pages/CollectionGamePage.tsx";
import { CategoryPage } from "./pages/CategoryPage.tsx";

interface UseAuthProps {
  accessToken: string;
  authStatus: AuthStatus;
}

export const GameNestApp = () => {
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
    {
      id: 9,
      path: "/platform/:path",
      element: <CategoryPage />,
    },
    {
      id: 10,
      path: "/genre/:path",
      element: <CategoryPage />,
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
      <Routes>
        <Route
          element={
            <ProtectedRoute
              isAllowed={!accessToken}
              authStatus={authStatus}
              redirectTo="/404"
            />
          }
        >
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user/validate/:token" element={<ValidationPage />} />
        </Route>
        <Route>
          {publicRoutes.map((route) => {
            return (
              <Route key={route.id} path={route.path} element={route.element} />
            );
          })}
        </Route>
        <Route
          element={
            <ProtectedRoute
              isAllowed={!!accessToken}
              authStatus={authStatus}
              redirectTo="/login"
            />
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
    </>
  );
};
