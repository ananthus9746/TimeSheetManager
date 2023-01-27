import axios from "axios";
const baseURL = "http://localhost:8000";

const defaultOptions = {
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
};

// Create  user instance
let AxiosInstance = axios.create(defaultOptions);

// Set the AUTH token for any request
// userinstance.interceptors.request.use(function (config) {
//   const token = localStorage.getItem("userToken");
//   config.headers.accesstoken = token;
//   return config;
// });

export default AxiosInstance;