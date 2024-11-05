import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const optionalAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next();
    }

    req.user_id = decoded.id;
    next();
  });
};
