import queryString from "query-string";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export const useQueryParams = () => {
  const { search } = useLocation();
  const query = queryString.parse(search);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  //TODO1: crear metodos.
  //TODO 2: Bajar la cantidad de elementos traídos a 12.

  //* Metodo para eliminar un parametro de la URL. Puede recibir un string o un array de strings.

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

  return { query, searchParams, navigate, setParams, clearParams, getQueryString };
};
