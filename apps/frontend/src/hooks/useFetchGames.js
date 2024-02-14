import { useEffect, useState } from "react";

export const useFetchGames = () => {
  const [gamesData, setGamesData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getGames = async () => {
      const response = await fetch("http://localhost:3000/api/games");
      const data = await response.json();
      setGamesData(data.games);
      setIsLoading(false);
      console.log(gamesData);
    };
    getGames();
  }, []);

  return { gamesData, isLoading };
};
