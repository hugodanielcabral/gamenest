import type { ICountry } from "../types/country";
import sql from "../db";

export default class Country {
  static async findAll(): Promise<ICountry[] | null> {
    const countries = await sql<ICountry[]>`SELECT * FROM country`;

    if (!countries.length) return null;

    return countries;
  }

  static async findById(country_id: string): Promise<ICountry | null> {
    const countries = await sql<
      ICountry[]
    >`SELECT * FROM country WHERE country_id = ${country_id}`;

    if (!countries.length) return null;

    return countries[0];
  }

  static async create(name: string, domain: string): Promise<ICountry | null> {
    const newCountry = await sql<
      ICountry[]
    >`INSERT INTO country (name, domain) VALUES (${name}, ${domain}) RETURNING *`;

    if (!newCountry.length) return null;

    return newCountry[0];
  }

  static async update(
    id: string,
    name: string,
    domain: string
  ): Promise<ICountry | null> {
    const updatedCountry = await sql<
      ICountry[]
    >`UPDATE country SET name = ${name}, domain = ${domain} WHERE country_id = ${id} RETURNING *`;

    if (!updatedCountry.length) return null;

    return updatedCountry[0];
  }

  static async delete(id: string): Promise<ICountry | null> {
    const deletedCountry = await sql<
      ICountry[]
    >`DELETE FROM country WHERE country_id = ${id} RETURNING *`;

    if (!deletedCountry.length) return null;

    return deletedCountry[0];
  }
}
