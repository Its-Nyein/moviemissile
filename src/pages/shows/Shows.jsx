import { useEffect, useState } from "react";
import { fetchTvSeriesDiscovers } from "../../services/fetcher";
import MovieCard from "../../components/MovieCard";
import Pagination from "../../UI/Pagination";
import SkeletonLoader from "../../UI/SkeletonLoader";

const Shows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [pages, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchTvSeriesDiscovers(pages, sortBy)
      .then((res) => setTvShows(res?.results))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [pages, sortBy]);

  if (tvShows.length === 0) {
    return (
      <div className="container mx-auto max-w-7xl px-4 my-5">
        <h2 className="font-semibold uppercase text-[#353535] opacity-80">
          Discover TV Shows
        </h2>
        <p className="text-center mt-4 text-gray-500">
          No TV shows available on this page.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 my-5">
      <div className="flex gap-2 items-center mb-10">
        <h2 className="font-semibold uppercase text-[#353535] opacity-80">
          Discover TV Shows
        </h2>

        <select
          className="p-2 border border-[#01b4e4] focus:outline-none rounded text-[#353535]"
          value={sortBy}
          onChange={(e) => {
            e.preventDefault();
            setPages(1);
            setSortBy(e.target.value);
          }}
        >
          <option value="popularity.desc">Popular</option>
          <option value="vote_average.desc&vote_count.gte=1000">
            Top Rated
          </option>
        </select>
      </div>

      <div
        className={`transition-all duration-300 ${
          loading ? "bg-white/50 backdrop-blur-md" : ""
        }`}
      >
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4 align-middle my-8">
            {Array(tvShows?.length)
              .fill("")
              .map((_, idx) => (
                <SkeletonLoader key={idx} />
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4 align-middle my-8">
            {tvShows.map((movie) => (
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

export default Shows;
