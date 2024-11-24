import { Link } from "react-router-dom";
import MovieDBLogo from "../assets/moviedb.svg";

const Navbar = () => {
  return (
    <nav className="bg-whit text-[#353535] py-4 shadow-md">
      <div className="container mx-auto max-w-7xl flex items-center justify-between">
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

        <div className="space-x-6">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
