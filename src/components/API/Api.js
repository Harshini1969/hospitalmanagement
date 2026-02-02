import axios from "axios";

const api = axios.create({
  baseURL: "https://hsserver-1.onrender.com",
});

export default api;
