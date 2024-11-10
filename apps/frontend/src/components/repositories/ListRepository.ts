import { FormState } from "../../types/listsManager";

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const ListRepository = {
  async getListById(id: string) {
    try {
      const response = await fetch(`${BASE_URL}/lists/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  },

  async create(data: FormState) {
    try {
      const response = await fetch(`${BASE_URL}/lists`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          visibility: Boolean(data.visibility),
          games: data.games,
        }),
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  },

  async update(data: FormState, id: string) {
    try {
      const response = await fetch(`${BASE_URL}/lists/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          visibility: Boolean(data.visibility),
          games: data.games,
          deletedGameIds: data.deletedGameIds,
        }),
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  },
};
