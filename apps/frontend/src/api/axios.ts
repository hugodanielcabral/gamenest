import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
