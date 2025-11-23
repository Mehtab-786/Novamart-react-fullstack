import { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "../Services/Api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const userContext = createContext(null);

export const useAuth = () => useContext(userContext);

function UserProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function newUserRegister(data) {
    console.log(user)
    try {
      setLoading(true);
      const res = await registerUser(data);
      console.log(res);
      if (res.success == true) {
        setUser(res?.data);
        toast.success("User registered succesfully");
        console.log(res);
        navigate("/");
      }
    } catch (err) {
      console.log(err)
      const errorMsg = err?.message || err?.error || "Login failed";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  async function newUserLogin(data) {
    console.log(user)
    try {
      setLoading(true);
      const res = await loginUser(data);
      console.log(res);
      if (res.user) {
        setUser(res.user);
        toast.success("User logged in succesfully");
        console.log(res);
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <userContext.Provider value={{ user, newUserRegister, newUserLogin }}>
      {children}
    </userContext.Provider>
  );
}

export default UserProvider;
