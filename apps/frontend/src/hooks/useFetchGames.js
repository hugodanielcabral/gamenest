import { useEffect, useState } from "react";

export const useFetchGames = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGames = async () => {
    const response = await fetch("http://localhost:3000/api/games");
    const json = await response.json();
    setGames(json);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return {
    games,
    isLoading,
  };
};
