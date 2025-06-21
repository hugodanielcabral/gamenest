import { JwtAdapter } from "../adapters/jwt.adapter.js";
import User from "../models/user.model.js";
import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
  user_id?: number | undefined;
}
const JWT = new JwtAdapter();

export const AuthMiddleware = {
  async validateJWT(req: AuthRequest, res: Response, next: NextFunction) {
    /*     const authorization = req.header("authorization");
     */

    const token = req.cookies;

    if (!token) {
      res.status(401).json({ error: "No se proveyó ningún token." });
      return;
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

      if (!payload) {
        res.status(401).json({ error: "Token invalido." });
        return;
      }

      const user = await User.findById(payload.user_id);

      if (!user) {
        res.status(401).json({ error: "Invalid token - user" });
        return;
      }

      req.user_id = parseInt(payload.user_id);

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "Internal server error" });
    }
  },

  async optionalAuth(req: AuthRequest, res: Response, next: NextFunction) {
    const token = req.cookies;

    if (!token) {
      return next();
    }

    try {
      const payload = await JWT.validateToken(
        token.refreshToken,
        process.env.REFRESH_TOKEN_SEED
      );

      if (!payload) {
        next();
        return;
      }

      const user = await User.findById(payload.user_id);

      if (!user) {
        next();
        return;
      }

      req.user_id = parseInt(payload.user_id);

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "Internal server error" });
    }
  },
};
