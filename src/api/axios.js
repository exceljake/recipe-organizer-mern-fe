import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "/api";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

export default api;
