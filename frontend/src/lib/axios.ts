import axios from 'axios';

console.log('🔍 Environment Debug:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('NEXT_PUBLIC_API_BASE_URL:', process.env.NEXT_PUBLIC_API_BASE_URL);
console.log('NEXT_PUBLIC_API_BASE_URL_PROD:', process.env.NEXT_PUBLIC_API_BASE_URL_PROD);

// ✅ Same-domain setup: Use api.sriyog.app for production
const getBaseURL = () => {
  if (process.env.NODE_ENV === "production") {
    // Use custom domain for production (same-domain as dashboard.sriyog.app)
    return process.env.NEXT_PUBLIC_API_BASE_URL_PROD || 'https://api.sriyog.app';
  }
  // Development: use local server
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true, // ✅ Essential for same-domain cookie sharing
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log('🎯 Selected baseURL:', axiosInstance.defaults.baseURL);
console.log('🍪 withCredentials:', axiosInstance.defaults.withCredentials);

export default axiosInstance;