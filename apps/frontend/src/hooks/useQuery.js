import { useSearchParams } from "react-router-dom";

export const useQuery = () => {
  //TODO 1: Improve the useQuery hook to return the query and params as objects and make function(s)
  const [searchParams, setSearchParams] = useSearchParams();
  const query = new URLSearchParams(location.search);
  const params = {};
  for (let [key, value] of query.entries()) {
    params[key] = value;
  }
  const paramsString = new URLSearchParams(params).toString();

  return {
    searchParams,
    setSearchParams,
    query,
    params,
    paramsString,
  };
};
