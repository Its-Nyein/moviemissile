import { useEffect, useState } from "react";
import { fetchMoviesDiscovers } from "../../services/fetcher";
import MovieCard from "../../components/MovieCard";
import Pagination from "../../UI/Pagination";
import SkeletonLoader from "../../UI/SkeletonLoader";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [pages, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchMoviesDiscovers(pages, sortBy)
      .then((res) => setMovies(res?.results))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [pages, sortBy]);

  return (
    <div className="container mx-auto max-w-7xl px-4 my-5">
      <h2 className="font-semibold uppercase text-[#353535] opacity-80">
        Discover Movies
      </h2>

      <div
        className={`transition-all duration-300 ${
          loading ? "bg-white/50 backdrop-blur-md" : ""
        }`}
      >
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4 align-middle my-8">
            {Array(movies?.length)
              .fill("")
              .map((_, idx) => (
                <SkeletonLoader key={idx} />
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4 align-middle my-8">
            {movies.map((movie) => (
              <MovieCard key={movie.id} item={movie} type="movie" />
            ))}
          </div>
        )}
      </div>

      <Pagination
        onPageChange={setPages}
        totalCount={totalPages}
        currentPage={pages}
        pageSize={20}
      />
    </div>
  );
};

export default Movies;
