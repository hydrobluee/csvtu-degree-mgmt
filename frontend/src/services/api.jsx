import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // Only if using cookies/auth, else optional
});

export default api;
