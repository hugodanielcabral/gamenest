import { useNavigate } from "react-router-dom";

export const useFilterParams = (route) => {
  let params = new URL(document.location);
  const navigate = useNavigate();

  return { params, handleFilterChange };
};
