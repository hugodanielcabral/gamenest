import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useDataFetch = <T>(url: string, query?: string) => {
  const [fetchData, setFetchData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getData = async (url: string, query?: string): Promise<void> => {
    try {
      const response = await fetch(
        `${BASE_URL}/${url}${query ? `?${query}` : ""}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
          },
        },
      );

      if (!response.ok) {
        setIsLoading(false);
        setError("Ocurrió un error al intentar obtener los datos");
        return;
      }

      const data: T = await response.json();
      setFetchData(data);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError("Error de conexión o de servidor");
    }
  };

  useEffect(() => {
    getData(url, query);

    return () => {
      setFetchData(null);
      setIsLoading(true);
    };
  }, [query]);

  return { fetchData, isLoading, error, setFetchData };
};
