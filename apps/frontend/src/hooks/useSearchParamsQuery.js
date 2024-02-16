import { useSearchParams } from "react-router-dom";

export const useSearchParamsQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getQueryParam = (key) => {
    return searchParams.get(key);
  };

  const addQueryParam = (key, value) => {
    setSearchParams((params) => {
      if (params.has(key)) {
        params.set(key, value);
      } else {
        params.append(key, value);
      }
      return new URLSearchParams(params.toString());
    });
  };

  const deleteQueryParam = (key) => {
    setSearchParams((params) => {
      if (params.has(key)) {
        params.delete(key);
      }
      return new URLSearchParams(params.toString());
    });
  };

  return { addQueryParam, deleteQueryParam, searchParams, getQueryParam };
};
