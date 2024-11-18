import dotenv from "dotenv";
import { JWT } from "../helpers/handleJwt.js";
import { UserRepository } from "../repositories/UserRepository.js";

dotenv.config({ path: ".env.development" });

export const AuthMiddleware = {
  async validateJWT(req, res, next) {
    /*     const authorization = req.header("authorization");
     */

    const token = req.cookies;

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    /*   if (!authorization.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Invalid Bearer Token" });
    } */

    /*     const accessToken = authorization.split(" ").at(1) || "";
     */
    try {
      const payload = await JWT.validateToken(
        token.refreshToken,
        process.env.REFRESH_TOKEN_SEED
      );

      if (!payload) return res.status(401).json({ error: "Invalid token" });

      const user = await UserRepository.findUserById(payload.user_id);

      if (!user[0])
        return res.status(401).json({ error: "Invalid token - user" });

      req.user_id = payload.user_id;

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "Internal server error" });
    }
  },

  async optionalAuth(req, res, next) {
    const token = req.cookies;

    if (!token) {
      return next();
    }

    try {
      const payload = await JWT.validateToken(
        token.refreshToken,
        process.env.REFRESH_TOKEN_SEED
      );

      if (!payload) return next();

      const user = await UserRepository.findUserById(payload.user_id);

      if (!user[0]) return next();

      req.user_id = payload.user_id;

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "Internal server error" });
    }
  },
};
