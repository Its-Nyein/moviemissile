import { Link, useNavigate } from "react-router-dom";
import MovieDBLogo from "../assets/moviedb.svg";
import { useAuth } from "../context/useAuth";
import profilePoster from "../assets/fallback-img.png";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log("Logout Error", error);
    }
  };

  const profilePath = user?.photoURL === null ? profilePoster : user?.photoURL;

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

        <div className="space-x-6 flex items-center">
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
      </div>
    </nav>
  );
};

export default Navbar;
