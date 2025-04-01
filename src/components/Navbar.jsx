import { Link, useNavigate } from "react-router-dom";
import MovieDBLogo from "../assets/moviedb.svg";
import { useAuth } from "../context/useAuth";
import profilePoster from "../assets/fallback-img.png";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log("Logout Error", error);
    }
  };

  const profilePath = user?.photoURL === null ? profilePoster : user?.photoURL;
  const closeMobileMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white text-[#353535] py-4 shadow-md">
      <div className="container mx-auto max-w-7xl flex items-center justify-between px-4">
        <div className="flex items-center space-x-10">
          <Link to="/" className="text-xl font-bold">
            <span>Moviemissile</span>
          </Link>

          <span className="text-sm text-gray-400 hidden md:inline">
            Powered By
          </span>

          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="items-center space-x-2 hover:opacity-80 hidden md:flex"
          >
            <img
              src={MovieDBLogo}
              alt="The Movie Database Logo"
              className="h-8"
            />
          </a>
        </div>

        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link to="/movies" className="hover:text-gray-400">
            Movies
          </Link>
          <Link to="/shows" className="hover:text-gray-400">
            TV Shows
          </Link>
          <Link to="/search" className="hover:text-gray-400">
            Search
          </Link>
          {user ? (
            <div>
              <div className="relative">
                <button
                  className="flex items-center space-x-2"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <img
                    src={profilePath}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                </button>
                {isOpen && (
                  <div className="flex flex-col absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border border-gray-200 z-10">
                    <Link
                      to="/watchlist"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Watchlist
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <Link to="/login">
                <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>

        <div className="flex md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-600"
          >
            <FaBars size={24} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={closeMobileMenu}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="bg-gray-200 w-64 h-full p-4 space-y-4 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center">
                <Link
                  to="/"
                  className="text-xl font-bold text-red-600"
                  onClick={closeMobileMenu}
                >
                  Moviemissile
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-black hover:text-red-600 transition"
                >
                  <span className="text-3xl">&times;</span>
                </button>
              </div>
              <div className="space-y-4">
                <Link
                  to="/"
                  className="block hover:text-gray-600"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
                <Link
                  to="/movies"
                  className="block hover:text-gray-600"
                  onClick={closeMobileMenu}
                >
                  Movies
                </Link>
                <Link
                  to="/shows"
                  className="block hover:text-gray-600"
                  onClick={closeMobileMenu}
                >
                  TV Shows
                </Link>
                <Link
                  to="/search"
                  className="block hover:text-gray-600"
                  onClick={closeMobileMenu}
                >
                  Search
                </Link>

                {user ? (
                  <>
                    <Link
                      to="/watchlist"
                      className="block hover:text-gray-600"
                      onClick={closeMobileMenu}
                    >
                      Watchlist
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                    onClick={() => {
                      navigate("/login");
                      setMenuOpen(false);
                    }}
                  >
                    Login
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
