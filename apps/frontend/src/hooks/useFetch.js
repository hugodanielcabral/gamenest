import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const localCache = {};

  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: false,
    error: null,
  });

  useEffect(() => {
    getFetch();
  }, [url]);

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

      const response = await fetch(url);

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
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
    error: state.error,
  };
};
