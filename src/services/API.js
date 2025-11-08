// src/api/userApi.js
import axios from "axios";
import instance, { clearTokensFromCookie, getAccessTokenFromCookie, getRefreshTokenFromCookie, setTokensInCookie } from "./Axios";

export async function registerUser(data) {
  try {
    const response = await instance.post("/auth/register", data);
    console.log(response)
    return response.data; // ✅ Return only the useful data
  } catch (error) {
    console.error("Registration failed:", error);
    throw error.response?.data || error;
  }
}

export async function getCurrentUser() {
}


export async function loginUser(data) {
  try {
    const response = await instance.post("/auth/login", data);
    console.log(response.data)
    return response.data; // ✅ Return only the useful data
  } catch (error) {
    console.error("Login  failed:", error);
    throw error.response?.data || error;
  }
}


// Logout helper
export function logoutClientSide() {
  clearTokensFromCookie();
}