import axios from "axios";
import { API_BASE_URL, CYBERSOFT_TOKEN } from "@/constants/app.constants";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    tokenCybersoft: CYBERSOFT_TOKEN,
  },
  timeout: 10000,
});
