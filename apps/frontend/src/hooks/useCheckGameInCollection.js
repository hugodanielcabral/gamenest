import { useEffect, useState } from "react";

export const useCheckGameInCollection = (param) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [gameInCollection, setGameInCollection] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  console.log(gameInCollection);

  useEffect(() => {
    const checkIfGameInCollection = async () => {
      try {
        const response = await fetch(`${BASE_URL}/collection/game/${param}`, {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
          },
        });
        if (response.ok) {
          setGameInCollection(true);
          setIsLoading(false);

          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    checkIfGameInCollection();
  }, [param]);

  return { gameInCollection, isLoading };
};
