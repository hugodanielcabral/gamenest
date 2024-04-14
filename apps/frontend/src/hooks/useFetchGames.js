import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useFetchGames = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [gamesData, setGamesData] = useState([]);
  const [gamesCount, setGamesCount] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const search = searchParams.get("search") || "";
  const platforms = searchParams.get("platforms") || "";
  const genres = searchParams.get("genres") || "";

  const queryObject = {};
  const fillQueryObject = () => {
    for (const [key, value] of searchParams.entries()) {
      queryObject[key] = value;
    }
  };
  fillQueryObject();

  const getGames = async () => {
    const response = await fetch(
      `${BASE_URL}/games${
        Object.prototype.hasOwnProperty.call(queryObject, "search") ||
        Object.prototype.hasOwnProperty.call(queryObject, "page") ||
        Object.prototype.hasOwnProperty.call(queryObject, "platforms") ||
        Object.prototype.hasOwnProperty.call(queryObject, "genres")
          ? "?" + new URLSearchParams(queryObject)
          : ""
      }`
    );
    const data = await response.json();
    setGamesData(data.games);
    setGamesCount(data.count.count);
    setCurrentPage(data.currentPage);
    setTotalPages(data.totalPages);
    setIsLoading(false);
  };
  useEffect(() => {
    getGames();
    return () => {
      setIsLoading(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, platforms, genres]);

  return { gamesData, isLoading, gamesCount, currentPage, totalPages };
};
