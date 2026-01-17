import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Info, Play, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { fetchAllMovies } from "../services/fetcher";
import type { Movie, TimeWindow } from "../types";

const Home = () => {
  const [data, setData] = useState<Movie[]>([]);
  const [timeWindow, setTimeWindow] = useState<TimeWindow>("day");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchAllMovies(timeWindow)
      .then((res) => setData(res))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [timeWindow]);

  const featuredMovie = data[0];
  const trendingMovies = data.slice(1);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {featuredMovie && !isLoading && (
        <section className="relative h-[75vh] min-h-[550px] overflow-hidden">
          {/* Background Image - Higher quality display */}
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${featuredMovie.backdrop_path})`,
            }}
          />

          {/* Dark gradient overlay - ensures text visibility in both themes */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Content */}
          <div className="relative container mx-auto flex h-full max-w-7xl items-end px-4 pb-16">
            <div className="max-w-xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded bg-red-600 px-3 py-1.5 text-xs font-bold text-white">
                  #1 Trending
                </span>
                <span className="text-sm font-medium text-white/80">
                  {timeWindow === "day" ? "Today" : "This Week"}
                </span>
              </div>

              <h1 className="mb-4 text-4xl font-bold text-white drop-shadow-lg md:text-5xl lg:text-6xl">
                {featuredMovie.title || featuredMovie.name}
              </h1>

              <div className="mb-4 flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 font-semibold text-yellow-400">
                  <Star className="h-4 w-4 fill-yellow-400" />
                  {featuredMovie.vote_average?.toFixed(1)}
                </span>
                <span className="text-white/70">
                  {featuredMovie.release_date?.split("-")[0]}
                </span>
              </div>

              <p className="mb-6 line-clamp-2 max-w-lg text-base text-white/80">
                {featuredMovie.overview}
              </p>

              <div className="flex gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-11 rounded-md bg-white px-6 font-semibold text-black hover:bg-white/90"
                >
                  <Link to={`/movie/${featuredMovie.id}`}>
                    <Play className="mr-2 h-5 w-5" fill="black" />
                    Watch Now
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="h-11 rounded-md border-0 bg-white/20 px-6 font-semibold text-white backdrop-blur-sm hover:bg-white/30"
                >
                  <Link to={`/movie/${featuredMovie.id}`}>
                    <Info className="mr-2 h-5 w-5" />
                    More Info
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trending Section */}
      <section className="container mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-foreground text-xl font-semibold md:text-2xl">
            Trending Now
          </h2>

          {/* Time Toggle - More subtle */}
          <div className="bg-muted flex items-center gap-1 rounded-lg p-1">
            <button
              onClick={() => setTimeWindow("day")}
              className={cn(
                "rounded-md px-4 py-1.5 text-sm font-medium transition-all",
                timeWindow === "day"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Today
            </button>
            <button
              onClick={() => setTimeWindow("week")}
              className={cn(
                "rounded-md px-4 py-1.5 text-sm font-medium transition-all",
                timeWindow === "week"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              This Week
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="bg-muted aspect-[2/3] w-full animate-pulse rounded-lg" />
                <div className="bg-muted h-4 w-3/4 animate-pulse rounded" />
                <div className="bg-muted h-3 w-1/2 animate-pulse rounded" />
              </div>
            ))}
          </div>
        ) : trendingMovies.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">
              No movies available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {trendingMovies.map((movie) => (
              <MovieCard key={movie.id} item={movie} type="movie" />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
