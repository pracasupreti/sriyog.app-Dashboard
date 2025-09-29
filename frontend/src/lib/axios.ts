import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === "production" 
    ? process.env.NEXT_PUBLIC_API_BASE_URL_PROD
    : process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

export default axiosInstance;