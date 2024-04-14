import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useFetch = (url) => {
  const localCache = {};
  const { search } = useLocation();

  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: false,
    error: null,
  });

  useEffect(() => {
    getFetch();
  }, [url, search]);

  const setLoadingState = () => {
    setState({
      data: null,
      isLoading: true,
      hasError: false,
      error: null,
    });
  };

  const getFetch = async () => {
    try {
      setLoadingState();

      const response = await fetch(`${url}${search}`);

      if (!response.ok) {
        setState({
          data: null,
          isLoading: false,
          hasError: true,
          error: {
            code: response.status,
            message: response.statusText,
          },
        });
        return;
      }

      const data = await response.json();
      setState({
        data,
        isLoading: false,
        hasError: false,
        error: null,
      });

      localCache[url] = data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    ...state.data,
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
    error: state.error,
  };
};
