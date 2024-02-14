import { useNavigate } from "react-router-dom";

export const useQuery = (route) => {
  let params = new URL(document.location);
  const navigate = useNavigate();

  const handlePageChange = (route, newPage) => {
    params.searchParams.set("page", newPage);
    navigate(`/${route}${params.search}`);
  };

  const handleQueryNameChange = (queryname, name) => {
    console.log(queryname, name);
    params.searchParams.set(queryname, name);
    if (params.searchParams.get("page") !== "0") {
      params.searchParams.delete("page");
    }
    navigate(`/${route}${params.search}`);
  };

  const handleResetSearch = () => {
    params.searchParams.delete("gamename");

    navigate(`/${route}${params.search}`);
  };

  const handleFilterChange = (filter, value) => {
    params.searchParams.set(filter, value);

    navigate(`/${route}${params.search}`);
  };

  return {
    params,
    handlePageChange,
    handleQueryNameChange,
    handleFilterChange,
    handleResetSearch,
  };
};
