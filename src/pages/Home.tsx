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
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${featuredMovie.backdrop_path})`,
            }}
          />

          {/* Dark gradient overlay - ensures text visibility in both themes */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Content */}
          <div className="relative container mx-auto max-w-7xl px-4 h-full flex items-end pb-16">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded">
                  #1 Trending
                </span>
                <span className="text-white/80 text-sm font-medium">
                  {timeWindow === "day" ? "Today" : "This Week"}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                {featuredMovie.title || featuredMovie.name}
              </h1>

              <div className="flex items-center gap-4 mb-4 text-sm">
                <span className="flex items-center gap-1 text-yellow-400 font-semibold">
                  <Star className="h-4 w-4 fill-yellow-400" />
                  {featuredMovie.vote_average?.toFixed(1)}
                </span>
                <span className="text-white/70">
                  {featuredMovie.release_date?.split("-")[0]}
                </span>
              </div>

              <p className="text-white/80 text-base mb-6 line-clamp-2 max-w-lg">
                {featuredMovie.overview}
              </p>

              <div className="flex gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 rounded-md px-6 h-11 font-semibold"
                >
                  <Link to={`/movie/${featuredMovie.id}`}>
                    <Play className="h-5 w-5 mr-2" fill="black" />
                    Watch Now
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm rounded-md px-6 h-11 font-semibold border-0"
                >
                  <Link to={`/movie/${featuredMovie.id}`}>
                    <Info className="h-5 w-5 mr-2" />
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">
            Trending Now
          </h2>

          {/* Time Toggle - More subtle */}
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => setTimeWindow("day")}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
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
                "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="aspect-[2/3] w-full rounded-lg bg-muted animate-pulse" />
                <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
                <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
              </div>
            ))}
          </div>
        ) : trendingMovies.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">
              No movies available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
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
