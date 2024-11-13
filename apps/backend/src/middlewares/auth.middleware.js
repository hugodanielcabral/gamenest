import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { JWT } from "../helpers/handleJwt.js";
import { UserRepository } from "../repositories/UserRepository.js";

dotenv.config();

export const isAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user_id = decoded.id;
    next();
  });
};

export const AuthMiddleware = {
  async validateJWT(req, res, next) {
    const authorization = req.header("Authorization");

    if (!authorization) {
      return res.status(401).json({ error: "No token provided" });
    }

    if (!authorization.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Invalid Bearer Token" });
    }

    const token = authorization.split(" ").at(1) || "";

    try {
      const payload = await JWT.validateToken(token);

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
};
