import { createContext, useContext } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;


interface ProfileStat {
    status_name: string;
    total: string | number;
  }
  
  interface UsersContextType {
    getProfileStats: () => Promise<ProfileStat[]>;
  }
export const UsersContext = createContext<UsersContextType | null>(null);

export const useUsers = () => {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error("useUsers must be used within an AuthProvider");
  }

  return context;
};

export const UsersProvider = ({ children }) => {

  const getProfileStats = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user/profile/stats`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      });

      if (!response.ok) {
        throw new Error("An error occurred");
      }

      const data = await response.json();

      return data;

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UsersContext.Provider
      value={{
        getProfileStats,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
