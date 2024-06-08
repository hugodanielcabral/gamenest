import { useEffect, useState } from "react";
import { useUsers } from "../context/UsersContext";

export const useProfileStats = () => {
  const { getProfileStats } = useUsers();

  const [profileStats, setProfileStats] = useState([]);
  
  useEffect(() => {
    getProfileStats().then((response) => {
      setProfileStats(response);
    });
  }, []);

  return { profileStats };
};
