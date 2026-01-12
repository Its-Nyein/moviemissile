import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { formatNumber, generatePoster } from "../../helpers/helpers";
import type {
  CastMember,
  CrewMember,
  MediaType,
  MovieDetails,
} from "../../types";
import MoviesCastsItem from "./MoviesCastsItem";

const MoviesCast = ({
  casts,
  crews,
  movie,
  mediaType,
}: {
  casts: CastMember[];
  crews: CrewMember[];
  movie: MovieDetails;
  mediaType: MediaType;
}) => {
  const [visibleCasts, setVisibleCasts] = useState(9);

  const loadMore = () => {
    setVisibleCasts((prev) => {
      const newVisibleCasts = prev + 9;
      return newVisibleCasts > casts?.length ? casts.length : newVisibleCasts;
    });
  };

  const remainingCasts = casts?.length - visibleCasts;

  const directors = crews?.filter((crew) => crew.job === "Director");
  const budget =
    movie?.budget != null && movie?.budget !== 0 && mediaType === "movie"
      ? "$" + formatNumber(movie.budget)
      : "-";

  const revenue =
    movie?.revenue != null && movie?.revenue !== 0 && mediaType === "movie"
      ? "$" + formatNumber(movie.revenue)
      : "-";

  return (
    <div className="container mx-auto max-w-7xl grid grid-cols-12 px-4 my-5 gap-5">
      <div className="col-span-12 md:col-span-8 lg:col-span-9">
        <h2 className="text-lg font-semibold text-foreground mb-3">Cast</h2>
        <div className="flex overflow-x-auto gap-3 pb-2">
          {casts?.slice(0, visibleCasts).map((cast) => (
            <div key={cast.id} className="w-36 min-w-[140px] flex-shrink-0">
              <MoviesCastsItem cast={cast} />
            </div>
          ))}
          {remainingCasts > 0 && (
            <div className="w-36 min-w-[140px] flex items-center justify-center">
              <button
                className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={loadMore}
              >
                <ChevronRight className="h-6 w-6" />
                <span className="text-sm">View More</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="col-span-12 md:col-span-4 lg:col-span-3">
        {directors && directors.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Directors
            </h3>
            <div className="space-y-2">
              {directors?.slice(0, 3).map((director) => (
                <div key={director.id} className="flex items-center gap-3">
                  <img
                    src={generatePoster(director.profile_path || "")}
                    alt={director.name}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <span className="text-foreground">{director?.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <div className="flex justify-between">
            <h4 className="font-semibold text-foreground">Status</h4>
            <p className="text-muted-foreground">{movie.status}</p>
          </div>

          {mediaType === "movie" && (
            <>
              <div className="flex justify-between">
                <h4 className="font-semibold text-foreground">Budget</h4>
                <p className="text-muted-foreground">{budget}</p>
              </div>

              <div className="flex justify-between">
                <h4 className="font-semibold text-foreground">Revenue</h4>
                <p className="text-muted-foreground">{revenue}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviesCast;
