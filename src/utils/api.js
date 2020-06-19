// Import Axios to make HTTP Requests
import axios from 'axios';

// Create api object that will be used to call APIs in Redux Actions
const api = axios.create({
  // Set Base URL to backend root
  baseURL: 'https://dry-castle-10158.herokuapp.com/',
  // Add header for content-type for POST requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Export api as default
export default api;