import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`,
    Accept: "application/json",
  },
});

export default api;
