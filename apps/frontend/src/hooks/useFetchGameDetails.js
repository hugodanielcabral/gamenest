import { useState, useEffect } from "react";

export const useFetchGameDetails = (gameId) => {
  const [game, setGame] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getGame = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/games/${gameId}`
        );
        const data = await response.json();
        setGame(data[0]);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getGame();
  }, [gameId]);

  return { game, isLoading };
};
