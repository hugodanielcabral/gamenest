import { useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useCollectionChecker = (gameSlug) => {
  const [collectionData, setCollectionData] = useState([]);
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

  useEffect(() => {
    getCollectionData();
  }, [gameSlug]);

  return { collectionData, isLoading };
};
