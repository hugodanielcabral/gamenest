import { useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;

interface CollectionData {
  id: number;
  collection_id: number;
  game_id: string;
  game_name: string;
  game_slug: string;
  game_cover: string;
  hours_played: number;
  minutes_played: number;
  rating: number;
  ownership_name: string;
  status_name: string;
  platform_name: string;
  store_name: string;
  is_favorite: boolean;
  difficulty: string;
  cover: {
    id: number;
    url: string;
  };
  start_date: string;
  finish_date: string;
  amount_paid: string;
  user_id: string;
}

export const useCollectionChecker = (gameSlug: string) => {
  const [collectionData, setCollectionData] = useState<CollectionData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  const getCollectionData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/collection/game/${gameSlug}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      if (response.status !== 200) {
        setIsLoading(false);
        throw new Error("Error en la petición");
      }

      const data = await response.json();
      setCollectionData(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteGameCollection = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/collection/delete/game/${collectionData[0].collection_id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
          },
        },
      );
      
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCollectionData();

    return () => {
      setIsLoading(true);
    };
  }, [gameSlug]);

  return { collectionData, isLoading, deleteGameCollection, getCollectionData, setCollectionData};
};
