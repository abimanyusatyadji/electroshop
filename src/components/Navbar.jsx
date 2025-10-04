import { NavLink, Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const activeClass =
    "text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600";
  const normalClass = "hover:text-blue-500 transition";

  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400"
        >
          ElectroShop
        </Link>

        {/* Menu */}
        <div className="flex items-center space-x-4 sm:space-x-6 md:space-x-8 text-sm sm:text-base">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
          >
            Home
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
          >
            Riwayat
          </NavLink>

          <NavLink
            to="/checkout"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
          >
            Checkout
          </NavLink>

          {/* Cart dengan badge */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              "relative flex items-center " +
              (isActive ? activeClass : normalClass)
            }
          >
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] sm:text-xs w-4 sm:w-5 h-4 sm:h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
