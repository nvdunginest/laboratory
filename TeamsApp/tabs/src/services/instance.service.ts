import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8001/api",
  timeout: 3600,
  headers: {
    "content-type": "application/json",
  },
});

export default axiosInstance;
