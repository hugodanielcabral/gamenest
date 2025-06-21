import sql from "../db";
import { ICollection, IPaginationResult } from "../types/collection";
import { AppError } from "../utils/appError";

export default class Collection {
  static async findAll(
    user_id: number | undefined,
    order: { [key: string]: string } | undefined,
    filters: { [key: string]: string } | undefined,
    page: number = 1,
    limit: number = 20,
    q?: string
  ): Promise<IPaginationResult | null> {
    if (!user_id) {
      throw new AppError("Ocurrió un error al verificar el usuario");
    }
    try {
      const currentPage = Math.max(1, page);
      const itemsPerPage = Math.max(1, Math.min(20, limit));
      const offset = (currentPage - 1) * itemsPerPage;
      const countResult = await sql<{ count: string }[]>`
          SELECT COUNT(*) as count FROM collection 
            WHERE user_id = ${user_id} 
            ${q?.trim() ? sql` AND game_name ILIKE ${`%${q.trim()}%`}` : sql``}
              ${
                filters
                  ? Object.entries(filters).flatMap(
                      ([column, value], i) =>
                        sql` AND ${sql(column)} IN ${sql(value.split(","))}`
                    )
                  : sql``
              }`;

      const totalItems = parseInt(countResult[0].count);
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      if (totalItems === 0) {
        return {
          data: [],
          pagination: {
            currentPage,
            totalPages,
            totalItems,
            itemsPerPage,
            hasNextPage: false,
            hasPreviousPage: false,
          },
        };
      }

      if (currentPage > totalPages) {
        throw new AppError(`Página ${currentPage} no existe.`, 400);
      }

      const collection = await sql<ICollection[]>`
          SELECT * FROM collection 
            WHERE user_id = ${user_id}
            ${q?.trim() ? sql` AND game_name ILIKE ${`%${q.trim()}%`}` : sql``} 
              ${
                filters
                  ? Object.entries(filters).flatMap(
                      ([column, value], i) =>
                        sql` AND ${sql(column)} IN ${sql(value.split(","))}`
                    )
                  : sql``
              } ORDER BY ${Object.entries(order ?? {}).flatMap(
        ([col, ord], i) => [
          i ? sql`,` : sql``,
          sql`${sql(col)} ${ord === "desc" ? sql`desc` : sql`asc`}`,
        ]
      )} LIMIT ${itemsPerPage} OFFSET ${offset}`;
      return {
        data: collection,
        pagination: {
          currentPage,
          totalPages,
          totalItems,
          itemsPerPage,
          hasNextPage: currentPage < totalPages,
          hasPreviousPage: currentPage > 1,
        },
      };
    } catch (error) {
      console.error("Error al traer los datos:", error);
      throw new AppError("Error al obtener la colección", 500);
    }
  }

  static async findById(
    user_id: number | undefined,
    gameSlug: string
  ): Promise<Collection | null> {
    try {
      if (!user_id) {
        throw new AppError("Ocurrió un error al verificar el usuario");
      }
      const collection = await sql<
        ICollection[]
      >`SELECT * FROM collection WHERE game_slug = ${gameSlug} AND user_id = ${user_id}`;

      return collection[0];
    } catch (error) {
      console.error("Error al traer los datos:", error);
      throw new AppError("Error al obtener la colección", 500);
    }
  }

  static async create(
    user_id: number | undefined,
    data: ICollection
  ): Promise<ICollection | null> {
    if (!user_id) {
      throw new AppError(
        "Ocurrió un error al intentar crear una nueva colección"
      );
    }

    try {
      const newCollection = await sql<
        ICollection[]
      >`INSERT INTO collection (user_id, game_id, game_slug, game_name, game_cover, platform_name, format_name, ownership_name, store_name, status_name, start_date, finish_date, rating, amount_paid, hours_played, minutes_played, difficulty, is_favorite) VALUES (${user_id}, ${
        data.game_id
      }, ${data.game_slug}, ${data.game_name}, ${data.game_cover}, ${
        data.platform_name
      }, ${data.format_name}, ${data.ownership_name}, ${
        data.store_name ?? "Ninguna"
      }, ${data.status_name}, ${data.start_date ?? null}, ${
        data.finish_date ?? null
      }, ${data.rating}, ${data.amount_paid ?? 0}, ${data.hours_played ?? 0}, ${
        data.minutes_played ?? 0
      }, ${data.difficulty ?? "Normal"}, ${
        data.is_favorite ?? false
      }) RETURNING *`;

      return newCollection[0];
    } catch (error) {
      console.error("Error al crear los datos:", error);
      throw new AppError("Error al crear una nueva colección", 500);
    }
  }

  static async update(
    user_id: number | undefined,
    data: ICollection,
    gameSlug: string
  ): Promise<ICollection | null> {
    if (!user_id) {
      throw new AppError(
        "Ocurrió un error al intentar crear una nueva colección"
      );
    }

    try {
      const updatedCollection = await sql<
        ICollection[]
      >`UPDATE collection SET ${sql(
        data
      )} WHERE game_slug = ${gameSlug} AND user_id = ${user_id} RETURNING *`;

      return updatedCollection[0];
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      throw new AppError("Error al actualizar la colección", 500);
    }
  }

  static async delete(collection_id: string): Promise<ICollection | null> {
    try {
      const deletedCollection = await sql<
        ICollection[]
      >`DELETE FROM collection WHERE collection_id = ${collection_id} RETURNING *`;

      return deletedCollection[0];
    } catch (error) {
      console.error("Error al eliminar los datos:", error);
      throw new AppError("Error al eliminar la colección", 500);
    }
  }
}
