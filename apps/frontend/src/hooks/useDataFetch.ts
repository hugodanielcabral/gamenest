import { useEffect, useState } from "react";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useDataFetch = (url: string, query?: string) => {
  const [fetchData, setFetchData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async (url: string, query?: string): Promise<void> => {
    try {
      const data = await fetch(
        `${BASE_URL}/${url}${query ? `?${query}` : ""}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
          },
        },
      );

      if (!data.ok) {
        setIsLoading(false);
        toast.error("Ocurrió un error al intentar obtener los datos");
        return setError("Ocurrió un error al intentar obtener los datos");
      }

      const response = await data.json();
      setIsLoading(false);
      setError(null);

      setFetchData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(url, query);

    return () => {
      setFetchData([]);
      setIsLoading(true);
    };
  }, [query]);

  return { fetchData, isLoading, error };
};
