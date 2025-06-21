import "./loadEnv.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import collectionRoutes from "./routes/collection.routes.js";
import gamesRoutes from "./routes/games.routes";
import countryRoutes from "./routes/country.routes.js";
import rolesRoutes from "./routes/roles.routes.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

// Error Handling

app.use(errorHandler);

export default app;
