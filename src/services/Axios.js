import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  headers: {
    "Content-Type": 'application/json'
  }
});

//Request intercepters
instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
}, (err) => Promise.reject(err))

//Response intercepters
instance.interceptors.response.use((res) => res, async (err) => {
  const { response } = err;

  if (response?.status === 401) {
    return Promise.reject({ code: "TOKEN_EXPIRED", originalError: err });
    // throw { code: 'TOKEN_EXPIRED', message: "Access token missing or expired" };
  }

  return Promise.reject(err);
});


export default instance;