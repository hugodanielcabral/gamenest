import jwt, { JwtPayload as DefaultJwtPayload, SignOptions } from "jsonwebtoken";

// Payload esperado con el campo user_id
export interface CustomJwtPayload extends DefaultJwtPayload {
  user_id: string;
}

interface IJwtAdapter {
  generateToken: (
    payload: object,
    SEED: string,
    expiresIn: string | number
  ) => Promise<string | null>;

  validateToken: (
    token: string,
    SEED: string
  ) => Promise<CustomJwtPayload | null>;
}

export class JwtAdapter implements IJwtAdapter {
  async generateToken(
    payload: object,
    SEED: string,
    expiresIn?: string | number
  ): Promise<string | null> {
    return new Promise((resolve) => {
      const options: SignOptions = {};
      if (expiresIn !== undefined) {
        options.expiresIn = expiresIn as jwt.SignOptions["expiresIn"];
      }

      jwt.sign(payload, SEED, options, (err, token) => {
        if (err || !token) return resolve(null);
        resolve(token);
      });
    });
  }

  async validateToken(
    token: string,
    SEED: string
  ): Promise<CustomJwtPayload | null> {
    return new Promise((resolve) => {
      jwt.verify(token, SEED, (err, decoded) => {
        if (err || typeof decoded !== "object" || !decoded) return resolve(null);

        const payload = decoded as CustomJwtPayload;

        if (!payload.user_id) return resolve(null);

        resolve(payload);
      });
    });
  }
}
