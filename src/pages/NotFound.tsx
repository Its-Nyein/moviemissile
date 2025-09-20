import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container mx-auto max-w-7xl flex items-center text-center justify-center my-8 px-4">
      <div>
        <h1 className="text-2xl font-bold text-[#353535]">
          404 - Page Not Found
        </h1>
        <p className="my-4">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          to="/movies"
          className="text-[#0d6efd] hover:underline font-semibold opacity-80"
        >
          Go to Movies
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
