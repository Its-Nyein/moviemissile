import { useEffect, useState } from "react";
import { fetchAllMovies } from "../services/fetcher";
import MovieCard from "../components/MovieCard";
import type { Movie, TimeWindow } from "../types";

const Home = () => {
  const [data, setData] = useState<Movie[]>([]);
  const [timeWindow, setTimeWindow] = useState<TimeWindow>("day");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchAllMovies(timeWindow)
      .then((res) => setData(res))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [timeWindow]);

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 my-5">
        <h2 className="font-semibold uppercase text-[#353535] opacity-80">
          Trending Movies
        </h2>
        <p className="text-center mt-4 text-gray-500">Loading...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="container mx-auto max-w-7xl px-4 my-5">
        <h2 className="font-semibold uppercase text-[#353535] opacity-80">
          Movies
        </h2>
        <p className="text-center mt-4 text-gray-500">
          No movies available on this page.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 my-5">
      <div className="flex items-center gap-4">
        <h2 className="font-semibold uppercase text-[#353535] opacity-80">
          Trending
        </h2>
        <div className="flex text-base border border-cyan-950 rounded-xl gap-3 shadow">
          <button
            className={`${
              timeWindow === "day"
                ? "bg-cyan-950 text-white"
                : "bg-transparent text-gray-700"
            } p-2 rounded-lg`}
            onClick={() => setTimeWindow("day")}
          >
            Today
          </button>
          <button
            className={`${
              timeWindow === "week"
                ? "bg-cyan-950 text-white"
                : "bg-transparent text-gray-700"
            } p-2 rounded-lg`}
            onClick={() => setTimeWindow("week")}
          >
            This Week
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4 align-middle my-8">
        {data.map((movie) => (
          <MovieCard key={movie.id} item={movie} type="movie" />
        ))}
      </div>
    </div>
  );
};

export default Home;
