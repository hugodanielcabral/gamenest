import { useSearchParams } from "react-router-dom";

export const useSearchParamsQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const addQueryParam = (key, value) => {
    console.log(key, value, "key, value");
    setSearchParams((params) => {
      if (params.has(key)) {
        params.set(key, value);
      } else {
        params.append(key, value);
      }
      return new URLSearchParams(params.toString());
    });
  };

  const updateQueryParam = (key, value) => {
    setSearchParams((params) => {
      if (params.has(key)) {
        params.set(key, value);
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

  return { addQueryParam, updateQueryParam, deleteQueryParam, searchParams };
};
