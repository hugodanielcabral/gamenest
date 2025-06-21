import { IToken } from "../types/token";
import sql from "../db";

export default class Token {
  static async findById(id: string, token: string): Promise<IToken | null> {
    const parsedId = parseInt(id);

    const foundToken = await sql<
      IToken[]
    >`SELECT * FROM refresh_tokens WHERE user_id = ${parsedId} AND token = ${token};`;

    if (!token.length) return null;

    return foundToken[0];
  }

  static async create(
    refreshToken: string,
    expireDate: number | Date,
    user_id: number
  ): Promise<IToken | null> {
    const newToken = await sql<
      IToken[]
    >`INSERT INTO refresh_tokens (token, expire_date, user_id) VALUES (${refreshToken}, ${expireDate}, ${user_id}
        ) RETURNING *;`;

    return newToken[0];
  }

  static async update(
    refreshToken: string,
    expireDate: number | Date,
    user_id: number | string
  ): Promise<IToken | null> {
    const parsedUserId = typeof user_id === "string" ? parseInt(user_id) : user_id;

    const updatedToken = await sql<
      IToken[]
    >`UPDATE refresh_tokens SET token = ${refreshToken}, expire_date= ${expireDate} WHERE user_id = ${parsedUserId};`;

    return updatedToken[0];
  }
}
