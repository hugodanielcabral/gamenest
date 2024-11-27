import {
  createContext,
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";
import { AuthRepository } from "../components/repositories/AuthRepository.ts";

import { useLocation } from "react-router-dom";
import { AuthStatus, Signin, Signup } from "../types/auth.ts";

export const AuthContext = createContext(null);

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
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [authStatus, setAuthStatus] = useState<AuthStatus>(
    AuthStatus.Authenticating,
  );

  const signup = async (formData: Signup) => {
    try {
      const response = await AuthRepository.signup(formData);

      if (response.status !== 201) {
        setErrors(response.data.errors);
        throw new Error(
          response.data.errors
            ? response.data.errors[0].msg
            : "An error occurred",
        );
      }
      return response.data;
    } catch (error) {
      setErrors(error.response.data.errors);
      console.log(error);
    }
  };

  const signin = async (formData: Signin) => {
    try {
      const response = await AuthRepository.signin(
        formData.username,
        formData.password,
      );

      if (response.status !== 200) {
        setErrors(response.data.errors);
        setIsAuth(false);
        setAuthStatus(AuthStatus.Error);
        throw new Error(
          response.data.errors
            ? response.data.error[0].msg
            : "An error occurred",
        );
      }
      setIsAuth(true);
      setAuthStatus(AuthStatus.Authenticated);
      setUser(response.data.user_id);
      setAccessToken(response.data.accessToken);
      return response.data;
    } catch (error) {
      setErrors(error.response.data.errors);
      setIsAuth(false);
      setAuthStatus(AuthStatus.Error);
      console.log(error);
    }
  };

  const signout = async () => {
    try {
      setAuthStatus(AuthStatus.Authenticating);
      const response = await AuthRepository.signout();

      if (response.status !== 200) {
        setAuthStatus(AuthStatus.Error);
        throw new Error("An error occurred during signout.");
      }

      setIsAuth(false);
      setUser(null);
      setAccessToken(null);
      setAuthStatus(AuthStatus.Authenticated);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshToken = async () => {
    setAuthStatus(AuthStatus.Authenticating);
    try {
      const response = await AuthRepository.refreshToken();

      if (response.status !== 200) {
        setIsAuth(false);
        setAuthStatus(AuthStatus.Error);
        throw new Error("An error occurred during token refresh.");
      }

      setAuthStatus(AuthStatus.Authenticated);
      setAccessToken(response.data.accessToken);
      setUser(response.data.user_id);
      setIsAuth(true);
    } catch (error) {
      setIsAuth(false);
      setAuthStatus(AuthStatus.Error);
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    const initAuth = async () => {
      try {
        await refreshToken();
      } catch (error) {
        setIsAuth(false);
      } finally {
        setAuthStatus(AuthStatus.Authenticated);
      }
    };

    initAuth();
  }, [accessToken]);

  //* Because i was getting Login errors on the register page and viceversa
  //* But also, when i changed pages, the error never disappeared
  useEffect(() => {
    setErrors(null);
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        user,
        errors,
        signup,
        signin,
        signout,
        setErrors,
        refreshToken,
        accessToken,
        authStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
