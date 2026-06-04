import axios from "axios";
import { API_BASE_URL, CYBERSOFT_TOKEN } from "@/constants/app.constants";
import { useAuthStore } from "@/store/auth.store";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    tokenCybersoft: CYBERSOFT_TOKEN,
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.token = token;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuth();
    }
    return Promise.reject(error);
  }
);
