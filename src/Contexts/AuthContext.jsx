import { createContext, useContext, useEffect, useState } from "react";
import { currentUser, loginUser, registerUser } from "../Services/Api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const userContext = createContext(null);

export const useAuth = () => useContext(userContext);

function UserProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  async function getCurrentuser() {
    try {
      setLoading(true);
      const res = await currentUser();
      console.log(res);
      if(res.success == true){
        setUser(res?.data);
        toast.success("User authenticated");
        console.log(res);
      }
    } catch (err) {
      navigate('/login')
      const errorMsg = err?.message || err?.error || "Login again";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  async function newUserRegister(data) {
    try {
      setLoading(true);
      const res = await registerUser(data);
      if (res.success == true) {
        setUser(res?.data);
        toast.success("User registered succesfully");
        console.log(res);
        navigate("/");
      }
    } catch (err) {
      console.log(err)
      const errorMsg = err?.message || err?.error || "Register failed";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  async function newUserLogin(data) {
    try {
      setLoading(true);
      const res = await loginUser(data);
      if (res.success == true) {
        setUser(res?.data);
        toast.success("User logged in succesfully");
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


  
  return (
    <userContext.Provider value={{ user, newUserRegister, newUserLogin }}>
      {children}
    </userContext.Provider>
  );
}

export default UserProvider;
