import { useEffect, useState } from "react";
import { fetchMoviesDiscovers } from "../../services/fetcher";
import MovieCard from "../../components/MovieCard";
import Pagination from "../../UI/Pagination";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [pages, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("popularity.desc");

  useEffect(() => {
    fetchMoviesDiscovers(pages, sortBy)
      .then((res) => setMovies(res?.results))
      .catch((error) => console.log(error));
  }, [pages, sortBy]);

  return (
    <div className="container mx-auto max-w-7xl px-4 my-5">
      <h2 className="font-semibold uppercase text-[#353535] opacity-80">
        Discover Movies
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4 align-middle my-8">
        {movies.map((movie) => (
          <MovieCard key={movie.id} item={movie} type="movie" />
        ))}
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
