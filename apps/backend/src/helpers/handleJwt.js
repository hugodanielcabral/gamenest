import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const JWT = {
  async generateToken(payload, SEED, expiresIn = "2h") {
    return new Promise((resolve) => {
      jwt.sign(payload, SEED, { expiresIn }, (err, token) => {
        if (err) return resolve(null);

        resolve(token);
      });
    });
  },

  async validateToken(token, SEED) {
    return new Promise((resolve) => {
      jwt.verify(token, SEED, (err, decoded) => {
        if (err) return resolve(null);

        resolve(decoded);
      });
    });
  },
};
