import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useFetchGames = () => {
  const [gamesData, setGamesData] = useState([]);
  const [gamesCount, setGamesCount] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const gamename = searchParams.get("gamename") || "";

  const queryObject = {};
  const fillQueryObject = () => {
    for (const [key, value] of searchParams.entries()) {
      queryObject[key] = value;
    }
  };
  fillQueryObject();

  /*    let queryString = "?";

  for (const [key, value] of searchParams) {
    queryString.length === 1
      ? (queryString += `${key}=${value}`)
      : (queryString += `&${key}=${value}`);
  }
 */
  useEffect(() => {
    const getGames = async () => {
      const response = await fetch(
        `http://localhost:3000/api/games${
          Object.prototype.hasOwnProperty.call(queryObject, "gamename") ||
          Object.prototype.hasOwnProperty.call(queryObject, "page")
            ? "?" + new URLSearchParams(queryObject)
            : ""
        }`
      );
      const data = await response.json();
      console.log(data);
      setGamesData(data.games);
      setGamesCount(data.count.count);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
      setIsLoading(false);
    };
    getGames();
    return () => {
      setIsLoading(true);
    };
  }, [page, gamename]);

  return { gamesData, isLoading, gamesCount, currentPage, totalPages };
};
