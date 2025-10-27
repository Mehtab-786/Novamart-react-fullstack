import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.BACKEND_API_URL,
  timeout: 2000,
  headers: {
    "Content-Type": 'application/json'
  },
  withCredentials: true
});

export default instance;