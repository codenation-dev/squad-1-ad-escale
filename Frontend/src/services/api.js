import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "http://kimmikirino.pythonanywhere.com"
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default api;