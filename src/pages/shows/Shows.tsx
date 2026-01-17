import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Pagination from "../../UI/Pagination";
import MovieCard from "../../components/MovieCard";
import { fetchTvSeriesDiscovers } from "../../services/fetcher";
import type { Movie, SortBy } from "../../types";

const Shows = () => {
  const [tvShows, setTvShows] = useState<Movie[]>([]);
  const [pages, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("popularity.desc");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchTvSeriesDiscovers(pages, sortBy)
      .then((res) => {
        setTvShows(res?.results || []);
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
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-foreground text-2xl font-semibold">TV Shows</h1>

        {/* Sort Toggle */}
        <div className="bg-muted flex items-center gap-1 rounded-lg p-1">
          <button
            onClick={() => handleSortChange("popularity.desc")}
            className={cn(
              "rounded-md px-4 py-1.5 text-sm font-medium transition-all",
              sortBy === "popularity.desc"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Popular
          </button>
          <button
            onClick={() =>
              handleSortChange("vote_average.desc&vote_count.gte=1000")
            }
            className={cn(
              "rounded-md px-4 py-1.5 text-sm font-medium transition-all",
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
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="bg-muted aspect-[2/3] w-full animate-pulse rounded-lg" />
              <div className="bg-muted h-4 w-3/4 animate-pulse rounded" />
              <div className="bg-muted h-3 w-1/2 animate-pulse rounded" />
            </div>
          ))}
        </div>
      ) : tvShows.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-muted-foreground">No TV shows available.</p>
        </div>
      ) : (
        <>
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {tvShows.map((show) => (
              <MovieCard key={show.id} item={show} type="tv" />
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

export default Shows;
