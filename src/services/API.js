// src/api/userApi.js
import axios from "axios";
import instance from "./Axios";

export async function registerUser(data) {
  try {
    const response = await instance.post("/auth/register", data);
    console.log(response.data)
    return response.data; // ✅ Return only the useful data
  } catch (error) {
    console.error("Registration failed:", error);
    throw error.response?.data || error;
  }
}


export async function getCurrentUser() {
  try {
    const response = await instance.get("/auth/getme", {withCredentials:true});
    console.log(response.data)
    return response.data;
  } catch (error) {
    if (error?.code === 'TOKEN_EXPIRED') {
      console.warn('Access token expired, trying refresh ...');
      const refreshed = await refreshAccessToken();
      console.log(refreshed)
      if(refreshed){
        const retry = await instance.get('/auth/getme');
        return retry.data
      }
      throw new Error('Session expired. Please log in')
      
    }
    throw error.response?.data || error;
  }
}


export async function loginUser(data) {
  try {
    const response = await instance.post("/auth/login", data);
    return response.data; // ✅ Return only the useful data
  } catch (error) {
    console.error("Login  failed:", error);
    throw error.response?.data || error;
  }
}


export async function refreshAccessToken() {
  try {
    const refreshToken = localStorage.getItem('refreshToken')
    console.log('refresh token ::, ', refreshToken)

    const res = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/auth/access-token`, {
      // withCredentials: true
    });

    const newAccessToken = res.data?.accessToken;

    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken)
    }

    return true;

  } catch (err) {
    console.error("refreshAccessToken failed:", err);
    // cleanup and inform caller
    try { localStorage.removeItem("accessToken"); } catch (err) { console.log(err) }
    return false;
  }
}