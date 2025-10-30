// src/api/userApi.js
import instance from "./Axios";

export async function registerUser(data) {
  try {
    const response = await instance.post("/auth/register", data);
    return response.data; // ✅ Return only the useful data
  } catch (error) {
    console.error("Registration failed:", error);
    throw error.response?.data || error;
  }
}


export async function getCurrentUser() {
  try {
    const response = await instance.get("/auth/getme");
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}
