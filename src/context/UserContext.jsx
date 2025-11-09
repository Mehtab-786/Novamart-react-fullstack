import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  getCurrentUser,
  loginUser,
  registerUser,
  logoutClientSide,
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
        const res = await getCurrentUser();
        console.log(res)
        if (res?.data) {
          setUser(res?.data);
          setIsAuthenticated(true);
        } else {
          throw new Error("No user returned");
        }
      } catch (error) {
        // failed to get current user -> probably not authenticated
        console.warn("User not logged in or failed to fetch user:", error);
        logoutClientSide();
        setUser(null);
        setIsAuthenticated(false);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkUser();
    // we do not add navigate to deps to avoid re-running; it's okay
    // If you want to re-check on route change you can add additional logic
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ Register new user
  const userRegister = async (formData) => {
    try {
      setLoading(true);
      const data = await registerUser(formData);
      if (data?.user) {
        setUser(data.user);
        setIsAuthenticated(true);
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
      const data = await loginUser(userData);
      if (data?.user) {
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
  const logout = () => {

  };

  return (
    <UserContext.Provider
      value={{ user,
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
