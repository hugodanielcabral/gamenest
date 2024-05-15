import { useNavigate } from "react-router-dom";

export const useUpdateUrlAndNavigate = () => {
  const navigate = useNavigate();

  const url = new URL(window.location);
  const urlSearchParams = new URLSearchParams(url.search);

  const updateUrlAndNavigate = (queryObject) => {
    for (const query in queryObject) {
      if (queryObject[query].length === 0) {
        urlSearchParams.delete(query);
      } else {
        if (Array.isArray(queryObject[query])) {
          urlSearchParams.set(query, queryObject[query].join(","));
        } else {
          urlSearchParams.set(query, queryObject[query]);
        }
      }
    }

    navigate(`?${urlSearchParams.toString()}`);
  };

  const clearQueryParamAndNavigate = (key) => {
    urlSearchParams.delete(key);
    navigate(`?${urlSearchParams.toString()}`);
  };

  const clearAllQueryParamsAndNavigate = () => {
    urlSearchParams.forEach((value, key) => {
      urlSearchParams.delete(key);
    });

    navigate(`?${urlSearchParams.toString()}`);
  };

  return {
    updateUrlAndNavigate,
    clearQueryParamAndNavigate,
    clearAllQueryParamsAndNavigate,
    urlSearchParams,
  };
};
