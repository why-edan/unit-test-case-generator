import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:8000', // Replace with your FastAPI endpoint
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
    console.log('Sending request with:', { code, language });
    
    const response = await api.post('/generate-unit-test', { 
      input_code: code, 
      language: language 
    });
    
    console.log('Raw API response:', response);
    
    // Get the raw response data
    let formattedData = response.data;

    // If the response is a string, try to parse it as JSON
    if (typeof formattedData === 'string' && formattedData.trim().startsWith('{')) {
      try {
        const parsedData = JSON.parse(formattedData);
        formattedData = parsedData;
        console.log('Parsed JSON data:', formattedData);
      } catch (e) {
        console.log('Failed to parse as JSON, treating as string');
      }
    }
    
    // Helper function to replace escaped newlines
    const replaceNewlines = (str) => {
      if (typeof str !== 'string') return str;
      
      // First, log the original string for debugging
      console.log('Original string:', str);
      
      // Replace escaped newlines with actual newlines
      let result = str;
      
      // Replace literal "\n" with actual newlines
      result = result.replace(/\\n/g, '\n');
      
      // Replace double backslashes
      result = result.replace(/\\\\/g, '\\');
      
      // Log the result for debugging
      console.log('After newline replacement:', result);
      
      return result;
    };

    // If the response is a string, format it
    if (typeof formattedData === 'string') {
      formattedData = replaceNewlines(formattedData);
    } else if (formattedData && typeof formattedData === 'object') {
      // If it's an object with a test_cases property
      if (formattedData.test_cases) {
        formattedData.test_cases = replaceNewlines(formattedData.test_cases);
      }
      // If it's an object with a testCases property
      if (formattedData.testCases) {
        formattedData.testCases = replaceNewlines(formattedData.testCases);
      }
      // If it's an object with an output property
      if (formattedData.output) {
        formattedData.output = replaceNewlines(formattedData.output);
      }
    }
    
    return formattedData;
  } catch (error) {
    console.error('Error response:', error.response?.data);
    console.error('Error details:', error);
    throw error;
  }
};

export default api;