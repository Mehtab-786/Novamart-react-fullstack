import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
