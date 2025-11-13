import { useEffect } from "react";
import { useUser } from "../context/UserContext";

function Home() {
  const { user } = useUser();
  useEffect(() => {
    console.log('home page logging print ::', user)
  }, [])
  return <div>Home</div>;
}

export default Home;
