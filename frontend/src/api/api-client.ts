import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5008/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const session = localStorage.getItem("user_session");

  if (session) {
    const { token } = JSON.parse(session);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});
