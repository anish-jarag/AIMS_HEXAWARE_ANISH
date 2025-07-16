// src/axios.js
import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
});

// Interceptor to add JWT token to headers automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle response errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 errors globally if needed
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized - possible expired token");
      // Optionally redirect to login page or clear localStorage here
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
