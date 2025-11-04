import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCurrentUser, loginUser, registerUser } from "../services/API";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user data
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks login status
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const checkUser = async () => {
  //     try {
  //       const data = await getCurrentUser();
  //       setUser(data.user);
  //       console.log(data.user);
  //       setIsAuthenticated(true);
  //     } catch (error) {
  //       localStorage.removeItem("accessToken");
  //       console.warn("User not logged in, redirecting...", error);
  //       setIsAuthenticated(false);
  //       navigate("/login"); // if user not logged in
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   checkUser();
  // }, [navigate]);

  // ✅ Register new user
 
 
  const userRegister = async (formData) => {
    try {
      setLoading(true);
      const data = await registerUser(formData);
      setUser(data.user);
      setIsAuthenticated(true);
      console.log(data)
      navigate("/"); // redirect to home after successful register
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Example login function
  const userLogin = async (userData) => {
    try {
      setLoading(true);
      const data = await loginUser(userData);
      console.log(data)
      setUser(data.user);
      setIsAuthenticated(true);
      navigate("/"); // redirect to home after successful login
    } catch (error) {
      console.error("Login failed :", error);
    } finally {
      setLoading(false);
    }
  };

  // Example logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated, userLogin, logout, userRegister }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
