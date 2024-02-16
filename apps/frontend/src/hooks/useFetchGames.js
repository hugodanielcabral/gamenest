import { useEffect, useState } from "react";
import { useSearchParamsQuery } from "./useSearchParamsQuery";

export const useFetchGames = () => {
  const [gamesData, setGamesData] = useState([]);
  const [gamesCount, setGamesCount] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { searchParams } = useSearchParamsQuery();

  let queryString = "?";

  for (const [key, value] of searchParams) {
    queryString.length === 1
      ? (queryString += `${key}=${value}`)
      : (queryString += `&${key}=${value}`);
  }

  const getGames = async () => {
    const response = await fetch(
      `http://localhost:3000/api/games${queryString}`
    );
    const data = await response.json();
    setGamesData(data.games);
    setGamesCount(data.count.count);
    setIsLoading(false);
  };

  useEffect(() => {
    getGames();

    return () => {
      setGamesData([]);
      setGamesCount({});
      setIsLoading(true);
    };
  }, [searchParams]);

  return { gamesData, isLoading, gamesCount };
};
