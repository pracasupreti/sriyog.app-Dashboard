import axios from 'axios';


console.log('🔍 Environment Debug:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('NEXT_PUBLIC_API_BASE_URL:', process.env.NEXT_PUBLIC_API_BASE_URL);
console.log('NEXT_PUBLIC_API_BASE_URL_PROD:', process.env.NEXT_PUBLIC_API_BASE_URL_PROD);

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === "production" 
    ? process.env.NEXT_PUBLIC_API_BASE_URL_PROD
    : process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

console.log('🎯 Selected baseURL:', axiosInstance.defaults.baseURL);

export default axiosInstance;