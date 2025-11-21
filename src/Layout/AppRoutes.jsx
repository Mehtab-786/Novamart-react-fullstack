import { Route, Routes } from "react-router-dom";
import MainLayout from "../Routes/MainLayout";
import Home from "../Pages/Home";
import AuthLayout from "./AuthLayout";
import Register from "../Pages/Register";
import Products from "../Pages/Products";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        {/* <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<SingleProduct />} /> */}
      </Route>

      <Route element={<AuthLayout />}>
            <Route path="/register" element={<Register />} />
      </Route>

       {/* Protected */}
      {/* <Route            implementation later
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      /> */}
    </Routes>
  );
}

export default AppRoutes;
