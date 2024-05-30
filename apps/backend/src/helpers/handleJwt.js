import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const handleJwt = (payload, expiresIn = "1d") => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn }, (err, token) => {
      if (err) reject(err);

      resolve(token);
    });
  });
};
