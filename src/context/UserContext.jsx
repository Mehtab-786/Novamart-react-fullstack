import { createContext, useContext, useState } from "react";

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);        // Stores user data
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks login status

  // Example login function
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  // Example logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

