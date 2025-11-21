import { NavLink, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow flex justify-between items-center">
      
      {/* Logo */}
      <Link to="/" className="text-xl font-bold">
        BharatMart
      </Link>

      {/* Nav Links */}
      <div className="space-x-4 flex items-center">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "underline font-semibold" : "hover:underline"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "underline font-semibold" : "hover:underline"
          }
        >
          Products
        </NavLink>

        <NavLink
          to="/register"
          className={({ isActive }) =>
            isActive ? "underline font-semibold" : "hover:underline"
          }
        >
          Register
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "underline font-semibold" : "hover:underline"
          }
        >
          Login
        </NavLink>

      </div>
    </nav>
  );
}

export default Navbar;
