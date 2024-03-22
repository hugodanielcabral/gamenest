import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import collectionRoutes from "./routes/collection.routes.js";
import gamesRoutes from "./routes/games.routes.js";
import countryRoutes from "./routes/country.routes.js";
import rolesRoutes from "./routes/roles.routes.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  "/static/avatars",
  express.static(path.join(__dirname, "public", "avatars"))
);
// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
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
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default app;
