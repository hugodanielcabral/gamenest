import queryString from "query-string";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export const useQueryParams = () => {
  const { search } = useLocation();
  const query = queryString.parse(search);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const clearParams = (param: string | string[]) => {
    if (typeof param === "string") {
      searchParams.delete(param);
      navigate(`?${searchParams.toString()}`);
    } else {
      param.forEach((el) => {
        searchParams.delete(el);
        navigate(`?${searchParams.toString()}`);
      });
    }
  };

  const setParams = (param: string, value: string) => {
    searchParams.set(param, value);
    navigate(`?${searchParams.toString()}`);
  };

  const getQueryString = () => {
    let parsedQuery = searchParams.toString();

    return parsedQuery;
  };

  const getParams = () => {
    return Object.entries(query).map(([key, value]) => {
      return { key, value };
    });
  };

  return {
    query,
    searchParams,
    navigate,
    getParams,
    setParams,
    clearParams,
    getQueryString,
  };
};
