import { useSearchParams } from "react-router-dom";

export const useSearchParameters = (initialParams = {}) => {
  const [searchParams, setSearchParams] = useSearchParams(initialParams);

  const setParams = (newParams) => {
    setSearchParams((prev) => {
      let params = {};
      for (let [key, value] of prev) {
        params[key] = value;
      }

      return { ...params, ...newParams };
    });
  };

  const deleteParam = (param) => {
    setSearchParams((prev) => {
      let params = {};
      for (let [key, value] of prev) {
        params[key] = value;
      }

      delete params[param];
      return params;
    });
  };

  return { searchParams, setParams, deleteParam };
};
