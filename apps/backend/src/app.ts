import { Request, Response, NextFunction } from "express";
import "./loadEnv.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth";
import collectionRoutes from "./routes/collection.routes.js";
import gamesRoutes from "./routes/games.routes.js";
import countryRoutes from "./routes/country";
import rolesRoutes from "./routes/roles";
import usersRoutes from "./routes/users.routes.js";
import listsRoutes from "./routes/lists.routes.js";
import categoriesRoutes from "./routes/categories.routes.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
/* import "./cronJobs/deleteUnverifiedUsers.js";
import "./cronJobs/restartUserEditCredits.js"; */

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  "/resources/images/collection/icons",
  express.static(path.join(__dirname, "resources/images/collection/icons"))
);
app.use(
  "/resources/avatars",
  express.static(path.join(__dirname, "resources/avatars"))
);
// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Routes

app.use("/api", authRoutes);
app.use("/api", collectionRoutes);
app.use("/api", countryRoutes);
app.use("/api", rolesRoutes);
app.use("/api", gamesRoutes);
app.use("/api", usersRoutes);
app.use("/api", listsRoutes);
app.use("/api", categoriesRoutes);

// Error Handling
interface CustomError extends Error {
  status?: number;
}

app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default app;
