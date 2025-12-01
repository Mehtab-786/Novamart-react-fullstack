import { createContext, useContext, useState } from "react";

const userContext = createContext(null);

export const useAuth = () => useContext(userContext);

function UserProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  return <userContext.Provider value={{}}>{children}</userContext.Provider>;
}

export default UserProvider;
