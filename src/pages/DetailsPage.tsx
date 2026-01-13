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
              className="w-full object-cover rounded-lg shadow"
            />
          </div>

          {/* Details */}
          <div className="col-span-8 md:col-span-9">
            {/* Title */}
            <div className="flex gap-2 mb-3 items-center">
              <h4 className="text-lg text-foreground font-bold">{title}</h4>
              <p className="text-muted-foreground">{releasedYear}</p>
            </div>

            {/* Date and Runtime */}
            <div className="flex flex-col md:flex-row mb-3 gap-2 md:gap-0 text-muted-foreground">
              <div className="flex gap-2 mr-1 items-center">
                <span>
                  {releaseDate
                    ? new Date(releaseDate).toLocaleDateString("en-US")
                    : "N/A"}{" "}
                  (US)
                </span>
              </div>
              {type === "movie" && details.runtime && (
                <div className="flex gap-1">
                  <div className="hidden md:flex mx-2">*</div>
                  <div>{minutesToHrs(details.runtime)}</div>
                </div>
              )}
            </div>

            {/* Genres */}
            <p className="flex mb-3 gap-1 flex-wrap">
              {details.genres?.map((genre) => (
                <span
                  key={genre?.id}
                  className="p-2 border border-border rounded text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </p>

            {/* Rating */}
            <p className="flex gap-2 mb-3 items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span>User Score - {details.vote_average?.toFixed(1)}/10 ({formatNumber(details.vote_count)})</span>
            </p>

            {/* Watchlist Button */}
            <MoviesWatchlistBtn details={details} type={type as MediaType} />

            {/* Tagline */}
            {details.tagline && (
              <p className="text-muted-foreground text-sm italic mt-2">
                {details.tagline}
              </p>
            )}

            {/* Overview - Desktop */}
            <div className="mt-8 hidden lg:block">
              <h2 className="text-lg font-bold text-foreground mb-2">Overview</h2>
              <span className="text-muted-foreground leading-relaxed">
                {details.overview}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 lg:hidden">
          <h2 className="text-lg font-bold text-foreground mb-2">Overview</h2>
          <span className="text-muted-foreground leading-relaxed">
            {details.overview}
          </span>
        </div>
      </div>

      {casts?.cast && casts.cast.length > 0 && (
        <MoviesCast casts={casts.cast} crews={casts.crew} movie={details} mediaType={type as MediaType} />
      )}

      {reviews?.length > 0 && <MoviesReviews reviews={reviews} />}

      {recommendations?.length > 0 && (
        <div className="container mx-auto max-w-7xl px-4 my-5">
          <h2 className="text-lg font-semibold text-foreground mb-3">
            Recommendations
          </h2>
          <div className="flex overflow-x-auto gap-3 pb-2">
            {recommendations?.map((recommendation) => (
              <div
                key={recommendation.id}
                className="w-36 min-w-[140px] min-h-[200px] shrink-0"
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
