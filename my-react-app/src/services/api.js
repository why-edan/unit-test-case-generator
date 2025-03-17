import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:8000/docs', // Replace with your FastAPI endpoint
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');
    if (user) {
      const token = JSON.parse(user).token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API functions
export const generateTests = async (code, language) => {
  try {
    const response = await api.post('/generate-tests', { code, language });
    return response.data;
  } catch (error) {
    console.error('Error generating tests:', error);
    throw error;
  }
};

export default api; 