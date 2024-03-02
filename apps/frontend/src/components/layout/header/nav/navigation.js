export const publicRoutes = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Games",
    path: "/games",
  },
  {
    name: "Game Details",
    path: "/games/:gameId",
  },
  {
    name: "Not Found",
    path: "*",
  },
];

export const privateRoutes = [
  {
    name: "Collection",
    path: "/collection",
  },
  {
    name: "Reviews",
    path: "/reviews",
  },
];

export const authRoutes = [
  {
    name: "Login",
    path: "/login",
  },
  {
    name: "Register",
    path: "/register",
  },
];
