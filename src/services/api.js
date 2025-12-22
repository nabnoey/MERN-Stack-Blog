import axios from "axios";
import TokenService from "./token.service";
// import dotenv from "dotenv";
// dotenv.config();
const baseURL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = TokenService.getAccessToken();
  if (token) {
    config.headers["x-access-token"] = token;
  }
  return config;
});
export default instance;
