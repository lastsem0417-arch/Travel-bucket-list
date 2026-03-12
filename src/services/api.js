import axios from "axios";

const API = axios.create({
  baseURL: "https://travel-bucket-list-4wmy.onrender.com/api"
});

// attach JWT token to every request
API.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

}, (error) => {
  return Promise.reject(error);
});

export default API;