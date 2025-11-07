// src/api/userApi.js
import instance from "./Axios";

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
 try {
  const data = await instance.get('/auth/getme')
  if(data){
    console.log(data)
    return data
  }
 } catch (error) {
  console.log('Error while fetching current user , login agan', error)
  throw new Error('Error while fetching current user , login again', {cause:"aldfkj"})
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
  
}