import axios from "axios";
const baseURL = "http://localhost:8000";

const defaultOptions = {
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
};

// Create  admin instance
let AdminAxiosInstance = axios.create(defaultOptions);

// Set the AUTH token for any request
AdminAxiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("Admintoken");
  config.headers.accesstoken = token;
  return config;
});

export default AdminAxiosInstance;