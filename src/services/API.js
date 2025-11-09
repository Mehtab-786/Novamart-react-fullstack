// src/api/userApi.js
import axios from "axios";
import Cookies from "js-cookie";

export async function registerUser(data) {
  try {
    const response = await axios.post("https://testdog.in/api/v1/auth/register", data);

    const { accessToken, refreshToken } = response.data;
    setToken({ accessToken, refreshToken });

    return response.data; // ✅ Return only the useful data
  } catch (error) {
    console.error("Registration failed:", error);
    throw error.response?.data || error;
  }
}


export async function getCurrentUser() {
  try {
    let accessToken = Cookies.get("accessToken");
    let refreshToken = Cookies.get("refreshToken");
    console.log("accessToken --> ", accessToken);
    console.log("refresh token --> ", refreshToken);

    // If there is no access token, try to refresh it first
    if (!accessToken) {
      accessToken = await refreshAccessToken(); // may throw 
      // NO_REFRESH_TOKEN
      console.log(accessToken)
    }

    // try getting the user
    const resp = await axios.get("https://testdog.in/api/v1/auth/getme", {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log(resp)
    return resp.data;
  } catch (error) {
    // If error was NO_REFRESH_TOKEN or something else, rethrow for the caller
    console.log('error -- no token found , ', error)
    throw error;
  }
}


export async function loginUser(data) {
  try {
    const response = await axios.post("https://testdog.in/api/v1/auth/login", data);

    const { accessToken, refreshToken } = response.data;
    setToken({ accessToken, refreshToken });

    return response.data; // ✅ Return only the useful data

  } catch (error) {
    console.error("Login  failed:", error);
    throw error.response?.data || error;
  }
}


// Logout helper
export function logoutClientSide() {
}


export function setToken(response) {
  Cookies.set("accessToken", response.accessToken, { expires: 1 / 24 }); // 1 hour
  Cookies.set("refreshToken", response.refreshToken, { expires: 30 }); // 30 days

  // After setting cookie:
  setTimeout(() => {
    Cookies.remove("accessToken");
    console.log("Access token expired. Logged out automatically.");
  }, 60 * 60 * 1000); // 1 hour

}


export async function refreshAccessToken() {
  let refreshToken = Cookies.get('refreshToken');

  if (!refreshToken) {
    // caller should handle (logout / redirect)
    throw new Error("NO_REFRESH_TOKEN");
  };

  try {
    const resp = await axios.get(
      'https://testdog.in/api/v1/auth/access-token',
      { headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${refreshToken}` } },
      )
    console.log(resp);

    
    const { accessToken, refreshToken: newRefreshToken } = resp.data;
    console.log('accessToken, newRefreshToken, refreshToken --> , ', accessToken, newRefreshToken, refreshToken)
    if (!accessToken) {
      throw new Error("REFRESH_FAILED_NO_ACCESS_TOKEN");
    }

    // keep tokens in sync in cookies / local state
    // If backend returns a new refresh token use it, otherwise reuse existing
    setToken({
      accessToken,
      refreshToken: newRefreshToken || refreshToken,
    });

    console.log('accessToken, refreshToken ', accessToken, refreshToken)
    return resp;
  } catch (error) {
    // bubble up so caller can logout / redirect
    // You can inspect err.response?.status if needed (e.g. 401 from refresh)
    console.log('error in creating new aces token', error)
    throw error;
  }

}