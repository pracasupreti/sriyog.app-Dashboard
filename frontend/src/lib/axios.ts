import axios from 'axios';

// ✅ Same-domain setup: Use api.sriyog.app for production
const getBaseURL = () => {
  if (process.env.NODE_ENV === "production") {
    // Use custom domain for production (same-domain as dashboard.sriyog.app)
    return process.env.NEXT_PUBLIC_API_BASE_URL_PROD || 'https://api.sriyog.app/api';
  }
  // Development: use local server
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true, // ✅ Essential for same-domain cookie sharing
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;