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
    } else {
      param.forEach((el) => {
        searchParams.delete(el);
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

  return {
    query,
    searchParams,
    navigate,
    setParams,
    clearParams,
    getQueryString,
  };
};
