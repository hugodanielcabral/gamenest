import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useFetchGames = () => {
  const [searchParams] = useSearchParams();
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    let pageParams = Number(searchParams.get("page")) || 0;
    setPage(pageParams);

    const fetchGames = async () => {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/games?page=${pageParams}`
      );
      const data = await response.json();
      setGames(data);
      setIsLoading(false);
    };

    fetchGames();
  }, [searchParams]);

  return { games, isLoading, setPage, page };
};
