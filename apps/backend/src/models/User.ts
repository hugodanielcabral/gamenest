import type { IUser } from "../types/user";
import sql from "../db";

export default class User {
  static async findByEmail(email: string): Promise<IUser | null> {
    const user = await sql<IUser[]>`SELECT * FROM users WHERE email = ${email}`;
    if (!user.length) return null;

    return user[0];
  }

  static async findByUsername(username: string): Promise<IUser | null> {
    const user = await sql<
      IUser[]
    >`SELECT * FROM users WHERE username = ${username}`;
    if (!user.length) return null;

    return user[0];
  }

  static async findById(id: number | string | undefined): Promise<IUser | null> {
    if (typeof id !== "number") return null;

    const user = await sql<IUser[]>`SELECT * FROM users WHERE user_id = ${id}`;
    if (!user.length) return null;

    return user[0];
  }

  static async create(
    username: string,
    email: string,
    password: string,
    country_id: string
  ): Promise<IUser | null> {
    const parsedCountryID = parseInt(country_id);
    const newUser = await sql<
      IUser[]
    >`INSERT INTO users (username, email, password, country_id) VALUES (${username}, ${email}, ${password}, ${parsedCountryID}) RETURNING *;`;

    if (!newUser.length) return null;

    return newUser[0];
  }
}
