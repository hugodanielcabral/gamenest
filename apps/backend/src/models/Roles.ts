import sql from "../db";
import { IRoles } from "../types/roles";

export default class Roles {
  static async findAll(): Promise<IRoles[] | null> {
    const roles = await sql<IRoles[]>`SELECT * FROM roles`;

    if (!roles.length) return null;

    return roles;
  }

  static async findById(id: string): Promise<IRoles | null> {
    const role = await sql<IRoles[]>`SELECT * FROM roles WHERE role_id = ${id}`;
    if (!role.length) return null;

    return role[0];
  }

  static async create(name: string): Promise<IRoles | null> {
    const newRole = await sql<
      IRoles[]
    >`INSERT INTO roles(name) VALUES(${name}) RETURNING *`;

    if (!newRole.length) return null;

    return newRole[0];
  }

  static async update(id: string, name: string): Promise<IRoles | null> {
    const updatedRole = await sql<
      IRoles[]
    >`UPDATE roles SET name = ${name} WHERE role_id = ${id} RETURNING *`;

    if (!updatedRole.length) return null;

    return updatedRole[0];
  }

  static async delete(id: string): Promise<IRoles | null> {
    const deletedRole = await sql<
      IRoles[]
    >`DELETE FROM roles WHERE role_id = ${id} RETURNING *`;

    if (!deletedRole.length) return null;

    return deletedRole[0];
  }
}
