import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const handleJwt = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) reject(err);

        resolve(token);
      }
    );
  });
};
