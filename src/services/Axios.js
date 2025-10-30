import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  timeout: 8000,
  headers: {
    "Content-Type": 'application/json'
  }
});

//Request intercepters
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (err) => Promise.reject(err))

//Response intercepters
instance.interceptors.response.use((res) => res, async (err) => {
  const { response } = err;
  if (response?.status === 401) {
    // Optionally trigger refresh or logout flow
  }
  return Promise.reject(err);
});


export default instance;