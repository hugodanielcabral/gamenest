import sql from "../db";
import { IRoles } from "../types/roles";

export default class Roles {
  static async findAll(): Promise<IRoles[] | undefined> {
    const roles = await sql<IRoles[]>`SELECT * FROM roles`;

    if (!roles.length) return undefined;

    return roles;
  }

  static async findById(id: string): Promise<IRoles | undefined> {
    const role = await sql<IRoles[]>`SELECT * FROM roles WHERE role_id = ${id}`;
    if (!role.length) return undefined;

    return role.at(0);
  }

  static async create(name: string): Promise<IRoles | undefined> {
    const newRole = await sql<
      IRoles[]
    >`INSERT INTO roles(name) VALUES(${name}) RETURNING *`;

    if (!newRole.length) return undefined;

    return newRole.at(0);
  }

  static async update(id: string, name: string): Promise<IRoles | undefined> {
    const updatedRole = await sql<
      IRoles[]
    >`UPDATE roles SET name = ${name} WHERE role_id = ${id} RETURNING *`;

    if (!updatedRole.length) return undefined;

    return updatedRole.at(0);
  }

  static async delete(id: string): Promise<IRoles | undefined> {
    const deletedRole = await sql<
      IRoles[]
    >`DELETE FROM roles WHERE role_id = ${id} RETURNING *`;

    if (!deletedRole.length) return undefined;

    return deletedRole.at(0);
  }
}
