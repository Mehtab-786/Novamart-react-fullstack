import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import {
  getCurrentUser,
  loginUser,
  registerUser,
  logoutClientSide,
  generateAccessToken,
} from "../services/API";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user data
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks login status
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        setLoading(true);

        let res;
        try {
          res = await getCurrentUser();
        } catch (error) {
          if(error?.response?.status === 401){
            console.log('Access token expired .Generating new token ...')

            const newToken = await generateAccessToken()

            if(!newToken?.data?.accessToken){
              throw new Error("Failed to refresh token");
            }

            //retry getcurrentuser()
            res = await getCurrentUser()
          }else {
            throw error;
          }
        }  

        if (res?.data) {
          setUser(res.data);
          setIsAuthenticated(true);
          alert(res.message)
          return;
        } else {
          throw new Error("No user returned");
        }
      } catch (error) {
        // failed to get current user -> probably not authenticated
        console.warn("User not logged in :", error);
        logoutClientSide();
        setUser(null);
        setIsAuthenticated(false);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, [navigate]);

  // ✅ Register new user
  const userRegister = async (formData) => {
    try {
      setLoading(true);
      const { data } = await registerUser(formData);
      if (data.data.user) {
        setUser(data.data.user);
        setIsAuthenticated(true);
        alert(data.message);
        navigate("/");
      }
      return data;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Example login function
  const userLogin = async (userData) => {
    try {
      setLoading(true);
      const { data } = await loginUser(userData);
      if (data?.user) {
        // await Cookies.set("refreshToken", data.refreshToken);
        // await Cookies.set("accessToken", data.accessToken);
        setUser(data.user);
        setIsAuthenticated(true);
        navigate("/");
      }
      return data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {};

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        userLogin,
        userRegister,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
