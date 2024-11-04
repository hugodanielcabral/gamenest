import { createContext, useState, useContext, useEffect } from "react";

import propTypes from "prop-types";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useStorage";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [errors, setErrors] = useState(null);
  const { pathname } = useLocation();
  const [isAuth, setIsAuth, removeIsAuth] = useLocalStorage("isAuth", false);
  /*   const [user, setUser, removeUser] = useLocalStorage("user", null);
   */ const [user, setUser] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const signup = async (formData) => {
    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          repassword: formData.repassword,
          country_id: formData.country_id,
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors);
        throw new Error(data.errors ? data.errors[0].msg : "An error occurred");
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const signin = async (formData) => {
    try {
      const response = await fetch(`${BASE_URL}/signin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors);
        throw new Error(data.errors ? data.errors[0].msg : "An error occurred");
      }

      setUser(data);
      setIsAuth(true);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const signout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/signout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });

      if (!response.ok) {
        throw new Error("An error occurred during signout.");
      }

      setIsAuth(false);
      setUser(null);
      /*       removeUser();
       */ removeIsAuth();
      Cookies.remove("token");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async (formData, username) => {
    try {
      const response = await fetch(
        `${BASE_URL}/user/update/profile/${username}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify({
            gender: formData.gender,
            country_id: formData.country_id,
            birthday: formData.birthday,
            title: formData.title,
            avatar: formData.avatar,
            user_edit_credits: 0,
          }),
        },
      );

      if (!response.ok) {
        const errors = await response.json();
        setErrors(errors.errors);
        throw new Error("An error occurred");
      }

      const data = await response.json();
      setUser(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Cookies.get("token")) {
      fetch(`${BASE_URL}/profile`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setIsAuth(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [pathname]);

  //* Because i was getting Login errors on the register page and viceversa
  //* But also, when i changed pages, the error never disappeared
  useEffect(() => {
    setErrors(null);
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        errors,
        signup,
        signin,
        signout,
        setIsAuth,
        setErrors,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: propTypes.node.isRequired,
};
