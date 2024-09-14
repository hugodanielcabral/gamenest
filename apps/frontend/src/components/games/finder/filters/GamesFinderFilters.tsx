import { useNavigate } from "react-router-dom";

export const GamesFinderFilters = () => {
  /* const searchParams = new URLSearchParams(window.location.search);

  searchParams.set("filter", "1");

  console.log(searchParams.get("filter"));

  const handleSearch = () => {
    searchParams.set("filter", "2");
  } */

  const navigate = useNavigate();

  return (
    <>
      <h1>Filters</h1>
      <input type="text" />
      <input type="checkbox" name="" id="" />
      <button className="btn btn-primary" onClick={() => navigate("?page=2")}>
        Filter BTN
      </button>
    </>
  );
};
