import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Pagination from "../../UI/Pagination";
import MovieCard from "../../components/MovieCard";
import { fetchMoviesDiscovers } from "../../services/fetcher";
import type { Movie, SortBy } from "../../types";

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pages, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("popularity.desc");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchMoviesDiscovers(pages, sortBy)
      .then((res) => {
        setMovies(res?.results || []);
        setTotalPages(res?.total_pages || 1);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [pages, sortBy]);

  const handleSortChange = (newSortBy: SortBy) => {
    setSortBy(newSortBy);
    setPages(1);
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold text-foreground">
          Movies
        </h1>

        {/* Sort Toggle */}
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          <button
            onClick={() => handleSortChange("popularity.desc")}
            className={cn(
              "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
              sortBy === "popularity.desc"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Popular
          </button>
          <button
            onClick={() => handleSortChange("vote_average.desc&vote_count.gte=1000")}
            className={cn(
              "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
              sortBy === "vote_average.desc&vote_count.gte=1000"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Top Rated
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="aspect-[2/3] w-full rounded-lg bg-muted animate-pulse" />
              <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
              <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
            </div>
          ))}
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No movies available.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
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
        </>
      )}
    </div>
  );
};

export default Movies;
