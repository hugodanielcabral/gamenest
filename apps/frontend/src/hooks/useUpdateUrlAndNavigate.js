import { useNavigate } from "react-router-dom";

export const useUpdateUrlAndNavigate = () => {
  const navigate = useNavigate();

  const url = new URL(window.location);
  const urlSearchParams = new URLSearchParams(url.search);

  const updateUrlAndNavigate = (queryObject) => {
    for (const query in queryObject) {
      if (queryObject[query] === "") {
        clearQueryParamAndNavigate(query);
        return;
      }
      urlSearchParams.set(query, queryObject[query]);
    }

    navigate(`?${urlSearchParams.toString()}`);
  };

  const clearQueryParamAndNavigate = (key) => {
    urlSearchParams.delete(key);
    navigate(`?${urlSearchParams.toString()}`);
  };

  return {
    updateUrlAndNavigate,
    clearQueryParamAndNavigate,
    urlSearchParams,
  };
};
