import type { ICountry } from "../types/country";
import sql from "../db";

export default class Country {
  static async findAll(): Promise<ICountry[] | undefined> {
    const countries = await sql<ICountry[]>`SELECT * FROM country`;

    if (!countries.length) return undefined;

    return countries;
  }

  static async findById(country_id: string): Promise<ICountry | undefined> {
    const countries = await sql<
      ICountry[]
    >`SELECT * FROM country WHERE country_id = ${country_id}`;

    if (!countries.length) return undefined;

    return countries.at(0);
  }

  static async create(
    name: string,
    domain: string
  ): Promise<ICountry | undefined> {
    const newCountry = await sql<
      ICountry[]
    >`INSERT INTO country (name, domain) VALUES (${name}, ${domain}) RETURNING *`;

    if (!newCountry.length) return undefined;

    return newCountry.at(0);
  }

  static async update(
    id: string,
    name: string,
    domain: string
  ): Promise<ICountry | undefined> {
    const updatedCountry = await sql<
      ICountry[]
    >`UPDATE country SET name = ${name}, domain = ${domain} WHERE country_id = ${id} RETURNING *`;

    if (!updatedCountry.length) return undefined;

    return updatedCountry.at(0);
  }

  static async delete(id: string): Promise<ICountry | undefined> {
    const deletedCountry = await sql<
      ICountry[]
    >`DELETE FROM country WHERE country_id = ${id} RETURNING *`;

    if (!deletedCountry.length) return undefined;

    return deletedCountry.at(0);
  }
}
