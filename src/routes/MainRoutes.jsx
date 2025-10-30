import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import ProductsPage from "../pages/ProductsPage";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Register from "../pages/Register";

// Define an array of route objects
const router = createBrowserRouter([
  {
    path: "/", // Root URL
    Component: App, // Main wrapper for your app (with <Outlet />)
    children: [
      { index: true, Component: Home },
      { path: "/products", Component: ProductsPage },
      { path: "/products/:productId", Component: ProductDetail },
      { path: "/cart", Component: Cart },
      { path: "/register", Component: Register },
    ],
  },
]);

export { router };
