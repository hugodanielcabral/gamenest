import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const JWT = {
  async generateToken(payload, expiresIn = "2h") {
    return new Promise((resolve) => {
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn }, (err, token) => {
        if (err) return resolve(null);

        resolve(token);
      });
    });
  },

  async validateToken(token) {
    return new Promise((resolve) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return resolve(null);

        resolve(decoded);
      });
    });
  },
};
