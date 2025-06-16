import type {
  IGames,
  ApiResponse,
  IGamesCount,
  IPopScore,
} from "../types/games";
import apicalypse from "apicalypse";
import { AppError } from "../utils/appError";

const requestOptions = {
  method: "post",
  baseURL: "https://api.igdb.com/v4",
  headers: {
    Accept: "application/json",
    "Client-ID": process.env.CLIENT_ID,
    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
  },
  responseType: "json" as const,
};

export interface IMultiQueryResponse {
  games: {
    name: string;
    result: IGames[];
  };
  count: IGamesCount;
}

export default class Games {
  static async findAll(
    sort: "name" | "rating" | "hypes",
    order: "asc" | "desc",
    platforms: string,
    page: string
  ): Promise<IMultiQueryResponse[] | null> {
    try {
      const response = await apicalypse(requestOptions)
        .multi([
          apicalypse()
            .query("games", "all-games")
            .fields(
              "name,slug,storyline,summary,version_title,first_release_date,cover.url,platforms.name,genres.name,involved_companies.company.name,involved_companies.developer,videos.video_id,ratings"
            )
            .limit(20)
            .offset(parseInt(page) * 20)
            .sort(`${sort} ${order}`)
            .where(
              `themes != (42) ${
                platforms ? `& platforms = (${platforms})` : ""
              }`
            ),
          apicalypse()
            .query("games/count", "total-games")
            .fields("platforms, themes")
            .where(
              `themes != (42) ${
                platforms ? `& platforms = (${platforms})` : ""
              }`
            ),
        ])
        .request("/multiquery");

      return response.data;
    } catch (error) {
      console.error("Error al traer los datos:", error);
      throw new AppError("Error al obtener juegos", 500);
    }
  }

  static async search(
    platforms: string,
    page: string,
    q: string
  ): Promise<IMultiQueryResponse[] | null> {
    try {
      const gamesRequest = apicalypse(requestOptions)
        .fields(
          "name,slug,storyline,summary,version_title,first_release_date,cover.url,platforms.name,genres.name,involved_companies.company.name,involved_companies.developer,videos.video_id,rating"
        )
        .search(q)
        .limit(20)
        .offset(parseInt(page) * 20)
        .where(
          `themes != (42) ${platforms ? `& platforms = (${platforms})` : ""}`
        )
        .request("/games");

      const countRequest = apicalypse(requestOptions)
        .fields("platforms, themes")
        .search(q)
        .where(
          `themes != (42) ${platforms ? `& platforms = (${platforms})` : ""}`
        )
        .request("/games/count");

      const [gamesResponse, countResponse] = await Promise.all([
        gamesRequest,
        countRequest,
      ]);

      return [
        {
          name: q,
          result: Array.isArray(gamesResponse)
            ? gamesResponse
            : gamesResponse?.data || [],
        },
        countResponse?.data || countResponse || { count: 0 },
      ];
    } catch (error) {
      console.error("Error al buscar juegos:", error);
      throw new AppError("Error al buscar juegos", 500);
    }
  }

  static async findById(
    id: string | number | number[]
  ): Promise<IGames | IGames[] | null> {
    const isArray = Array.isArray(id);
    let condition: string;

    if (typeof id === "string") {
      condition = `slug = "${id.replace(/"/g, '\\"')}"`;
    } else if (isArray) {
      const ids = (id as number[]).join(",");
      condition = `id = (${ids})`;
    } else {
      condition = `id = ${id}`;
    }

    try {
      const response: ApiResponse<IGames[] | IGames> = await apicalypse(
        requestOptions
      )
        .fields([
          "name",
          "slug",
          "storyline",
          "summary",
          "version_title",
          "first_release_date",
          "cover.url",
          "platforms.name",
          "genres.name",
          "involved_companies.company.name",
          "involved_companies.developer",
          "videos.video_id",
          "rating",
        ])
        .where(condition)
        .request("/games");

      if (
        response.status === 200 &&
        (Array.isArray(response.data)
          ? response.data.length > 0
          : !!response.data)
      ) {
        return isArray
          ? response.data
          : Array.isArray(response.data)
          ? response.data[0]
          : response.data;
      }

      throw new AppError("Juegos no encontrados)", 404);
    } catch (error) {
      console.error("Error al traer los datos:", error);
      throw new AppError("Error al buscar juegos", 500);
    }
  }

  static async findByQuery({
    sort = "first_release_date",
    order = "desc",
    limit = 10,
    where = "",
    offset = 0,
  }: {
    sort?: string;
    order?: "asc" | "desc";
    limit?: number;
    where?: string;
    offset?: number;
  }): Promise<IGames[] | null> {
    try {
      const response: ApiResponse<IGames[]> = await apicalypse(requestOptions)
        .fields(
          "name,slug,storyline,summary,version_title,first_release_date,cover.url,platforms.name,genres.name,involved_companies.company.name,involved_companies.developer,videos.video_id,rating,hypes"
        )
        .where(where)
        .sort(`${sort} ${order}`)
        .limit(limit)
        .offset(offset)
        .request("/games");

      if (response.status === 200 && response.data.length > 0) {
        return response.data;
      }

      throw new AppError("Juegos no encontrados", 404);
    } catch (error) {
      console.error("Error al traer los datos:", error);
      throw new AppError("Error al buscar juegos", 500);
    }
  }

  static async findByPopScore(): Promise<IPopScore[] | null> {
    try {
      const response: ApiResponse<IPopScore[]> = await apicalypse(
        requestOptions
      )
        .fields("game_id,value,popularity_type")
        .where("popularity_type = 1")
        .sort("value desc")
        .limit(20)
        .request("/popularity_primitives");

      if (response.status === 200 && response.data.length > 0) {
        return response.data;
      }

      throw new AppError("Juegos no encontrados", 404);
    } catch (error) {
      console.error("Error al traer los datos:", error);
      throw new AppError("Error al buscar juegos", 500);
    }
  }
}
