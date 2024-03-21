import { createContext, useState, useContext, useEffect } from "react";

import propTypes from "prop-types";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState(null);
  const { pathname } = useLocation();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const signup = async (formData) => {
    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          pass: formData.password,
          repass: formData.repassword,
          avatar:
            "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
          title: "Lord",
          country: formData.country,
          status_lock: false,
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
      setUser(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const signin = async (formData) => {
    console.log(formData.password);
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
          pass: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors);
        throw new Error(data.errors ? data.errors[0].msg : "An error occurred");
      }

      setUser(data);
      //* Because setIsAuth is set to true, the page reloads automatically. This caused
      //* the inability to execute any message with the "data" return variable. I resolved this by moving
      //* setIsAuth to the handleSubmit function in the LoginPage component.
      /*   setIsAuth(true); */
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
      const data = await response.json();
      setUser(null);
      setIsAuth(false);
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
          setUser(null);
          setIsAuth(false);
        });
    }
  }, []);

  //* Because i was getting Login errors on the register page and viceversa
  //* But also, when i changed pages, the error never disappeared
  useEffect(() => {
    setErrors(null);
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{ user, isAuth, errors, signup, signin, signout, setIsAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: propTypes.node.isRequired,
};
