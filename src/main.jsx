import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import UserProvider from "./Contexts/AuthContext.jsx";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
        <Toaster
          position="top-right"
          theme="system"
          richColors
          toastOptions={{
            className:
              "bg-gray-900 text-white rounded shadow-lg border border-gray-800 px-4 py-3 font-medium",
            style: { fontSize: "1rem" },
          }}
        />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
