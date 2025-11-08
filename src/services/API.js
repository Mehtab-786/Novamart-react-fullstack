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

/**
 * getCurrentUser - tries to fetch /auth/getme
 * - If access token missing -> attempts refresh once.
 * - If request returns 401 -> attempts refresh once and retries the call.
 * - If refresh not possible / fails -> throws so caller can logout and redirect.
 */
export async function getCurrentUser() {
  try {
    let accessToken = Cookies.get("accessToken");

    // If there is no access token, try to refresh it first
    if (!accessToken) {
      accessToken = await refreshAccessToken(); // may throw NO_REFRESH_TOKEN
    }

    // try getting the user
    const resp = await axios.get("https://testdog.in/api/v1/auth/getme", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(accessToken)
    console.log(resp)
    return resp.data;
  } catch (error) {
    // If the error is an axios response with 401, try refreshing once then retry
    const status = error?.response?.status;

    if (status === 401) {
      try {
        const newAccessToken = await refreshAccessToken(); // may throw NO_REFRESH_TOKEN or others

        // retry original request with the new token
        const retryResp = await axios.get(
          "https://testdog.in/api/v1/auth/getme",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${newAccessToken}`,
            },
          }
        );
        console.log(status)
        console.log(newAccessToken);
        console.log(newAccessToken)
        console.log(retryResp);
        return retryResp.data;
      } catch (refreshErr) {
        // refresh failed -> bubble up (caller will logout & navigate to login)
        console.log('error --> ', refreshErr)
        throw refreshErr;
      }
    }

    // If error was NO_REFRESH_TOKEN or something else, rethrow for the caller
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
      { refreshToken },
      { headers: { "Content-Type": "application/json" } }
    )
    console.log(resp);

    // Many APIs return payload in resp.data; ensure you destructure correctly:
    // Example expected shape: { accessToken: "...", refreshToken: "..." }
    const { accessToken, refreshToken: newRefreshToken } = resp.data;

    if (!accessToken) {
      throw new Error("REFRESH_FAILED_NO_ACCESS_TOKEN");
    }
    
    // keep tokens in sync in cookies / local state
    // If backend returns a new refresh token use it, otherwise reuse existing
    setToken({
      accessToken,
      refreshToken: newRefreshToken || refreshToken,
    });
    
    console.log(accessToken, refreshToken)
    return resp;
  } catch (error) {
    // bubble up so caller can logout / redirect
    // You can inspect err.response?.status if needed (e.g. 401 from refresh)
    console.log('error in creating new aces token', error)
    throw error;
  }


}