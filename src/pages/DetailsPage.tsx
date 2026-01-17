import { Star } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";
import fallback from "../assets/poster-fallback.jpg";
import MovieCard from "../components/MovieCard";
import { formatNumber } from "../helpers/helpers";
import {
  fetchMoviesCast,
  fetchMoviesDetails,
  fetchMoviesRecommendations,
  fetchMoviesReviews,
  imagePath,
} from "../services/fetcher";
import type { Credits, MediaType, Movie, MovieDetails, Review } from "../types";
import MoviesCast from "./movies/MoviesCast";
import MoviesReviews from "./movies/MoviesReviews";
import MoviesWatchlistBtn from "./movies/MoviesWatchlistBtn";

const DetailsPage = () => {
  const { type, id } = useParams<{ type: MediaType; id: string }>();
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [casts, setCasts] = useState<Credits | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!type || !id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [detailsData, creditsData, reviewsData, recommendationsData] =
          await Promise.all([
            fetchMoviesDetails(type as MediaType, parseInt(id)),
            fetchMoviesCast(type as MediaType, parseInt(id)),
            fetchMoviesReviews(type as MediaType, parseInt(id)),
            fetchMoviesRecommendations(type as MediaType, parseInt(id)),
          ]);

        setDetails(detailsData);
        setCasts(creditsData);
        setReviews(reviewsData);
        setRecommendations(recommendationsData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type, id]);

  if (loading || !details) {
    return <LoadingSpinner />;
  }

  const title = details.title || details.name;
  const releasedYear =
    type === "tv"
      ? details.first_air_date?.split("-")[0]
      : details.release_date?.split("-")[0];
  const releaseDate =
    type === "tv" ? details.first_air_date : details.release_date;

  const minutesToHrs = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const posterUrl = details?.poster_path
    ? `${imagePath}/${details?.poster_path}`
    : fallback;

  return (
    <Fragment>
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-12 gap-5">
          {/* Poster */}
          <div className="col-span-4 md:col-span-3">
            <img
              src={posterUrl}
              alt={details?.title || details?.name}
              className="w-full rounded-lg object-cover shadow"
            />
          </div>

          {/* Details */}
          <div className="col-span-8 md:col-span-9">
            {/* Title */}
            <div className="mb-3 flex items-center gap-2">
              <h4 className="text-foreground text-lg font-bold">{title}</h4>
              <p className="text-muted-foreground">{releasedYear}</p>
            </div>

            {/* Date and Runtime */}
            <div className="text-muted-foreground mb-3 flex flex-col gap-2 md:flex-row md:gap-0">
              <div className="mr-1 flex items-center gap-2">
                <span>
                  {releaseDate
                    ? new Date(releaseDate).toLocaleDateString("en-US")
                    : "N/A"}{" "}
                  (US)
                </span>
              </div>
              {type === "movie" && details.runtime && (
                <div className="flex gap-1">
                  <div className="mx-2 hidden md:flex">*</div>
                  <div>{minutesToHrs(details.runtime)}</div>
                </div>
              )}
            </div>

            {/* Genres */}
            <p className="mb-3 flex flex-wrap gap-1">
              {details.genres?.map((genre) => (
                <span
                  key={genre?.id}
                  className="border-border rounded border p-2 text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </p>

            {/* Rating */}
            <p className="mb-3 flex items-center gap-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>
                User Score - {details.vote_average?.toFixed(1)}/10 (
                {formatNumber(details.vote_count)})
              </span>
            </p>

            {/* Watchlist Button */}
            <MoviesWatchlistBtn details={details} type={type as MediaType} />

            {/* Tagline */}
            {details.tagline && (
              <p className="text-muted-foreground mt-2 text-sm italic">
                {details.tagline}
              </p>
            )}

            {/* Overview - Desktop */}
            <div className="mt-8 hidden lg:block">
              <h2 className="text-foreground mb-2 text-lg font-bold">
                Overview
              </h2>
              <span className="text-muted-foreground leading-relaxed">
                {details.overview}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 lg:hidden">
          <h2 className="text-foreground mb-2 text-lg font-bold">Overview</h2>
          <span className="text-muted-foreground leading-relaxed">
            {details.overview}
          </span>
        </div>
      </div>

      {casts?.cast && casts.cast.length > 0 && (
        <MoviesCast
          casts={casts.cast}
          crews={casts.crew}
          movie={details}
          mediaType={type as MediaType}
        />
      )}

      {reviews?.length > 0 && <MoviesReviews reviews={reviews} />}

      {recommendations?.length > 0 && (
        <div className="container mx-auto my-5 max-w-7xl px-4">
          <h2 className="text-foreground mb-3 text-lg font-semibold">
            Recommendations
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {recommendations?.map((recommendation) => (
              <div
                key={recommendation.id}
                className="min-h-[200px] w-36 min-w-[140px] shrink-0"
              >
                <MovieCard
                  item={recommendation}
                  type={recommendation.media_type as MediaType}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default DetailsPage;
