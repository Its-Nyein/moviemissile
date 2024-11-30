import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchMoviesCast,
  fetchMoviesDetails,
  fetchMoviesRecommendations,
  fetchMoviesReviews,
  imagePath,
} from "../services/fetcher";
import LoadingSpinner from "../UI/LoadingSpinner";
import { SlCalender } from "react-icons/sl";
import { FaRegClock } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { formatNumber } from "../helpers/helpers";
import MoviesCast from "./movies/MoviesCast";
import MoviesReviews from "./movies/MoviesReviews";
import MovieCard from "../components/MovieCard";
import MoviesWatchlistBtn from "./movies/MoviesWatchlistBtn";

const DetailsPage = () => {
  const { type, id } = useParams();
  const [details, setDetails] = useState([]);
  const [casts, setCasts] = useState({});
  const [reviews, setReviews] = useState({});
  const [recommendations, setRecommendations] = useState({});
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   fetchMoviesDetails(type, id)
  //     .then((res) => setDetails(res))
  //     .catch((err) => console.log(err))
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, [type, id]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [detailsData, creditsData, reviewsData, recommendationsData] =
          await Promise.all([
            fetchMoviesDetails(type, id),
            fetchMoviesCast(type, id),
            fetchMoviesReviews(type, id),
            fetchMoviesRecommendations(type, id),
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

  if (loading) {
    return <LoadingSpinner />;
  }

  const title = details?.title || details?.name;
  const releasedYear =
    type === "tv"
      ? details.first_air_date?.split("-")[0]
      : details.release_date?.split("-")[0];
  const releaseDate =
    type === "tv" ? details?.first_air_date : details?.release_date;

  const minutesToHrs = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <Fragment>
      <div className="container mx-auto max-w-7xl px-4 my-5 grid grid-cols-12 gap-5">
        <div className="col-span-4 md:col-span-3">
          <img
            src={`${imagePath}/${details.poster_path}`}
            alt={details?.title || details?.name}
            className="object-cover rounded-lg shadow"
          />
        </div>
        <div className="col-span-8 md:col-span-9 mt-0 mt-md-2 mt-xl-4">
          <div className="flex gap-2 mb-3 items-center">
            <h4 className="text-lg text-[#353535] font-bold">{title}</h4>
            <p>{releasedYear}</p>
          </div>

          <div className="flex flex-col md:flex-row mb-3 gap-2 md:gap-0">
            <div className="flex gap-2 mr-1 items-center">
              <SlCalender />
              <span>
                {new Date(releaseDate).toLocaleDateString("en-US")} (US)
              </span>
            </div>
            {type === "movie" && (
              <div className="flex gap-1">
                <div className="hidden md:flex mx-2">*</div>
                <FaRegClock />
                <div>{minutesToHrs(details?.runtime)}</div>
              </div>
            )}
          </div>

          <p className="flex mb-3 gap-1 flex-wrap">
            {details.genres?.map((genre) => (
              <span
                key={genre?.id}
                className="p-2 border border-[#01b4e4] rounded"
              >
                {genre.name}
              </span>
            ))}
          </p>

          <p className="flex gap-2 mb-3">
            <FaStar className="text-yellow-400" />
            User Score - {details?.vote_average}/10 (
            {formatNumber(details?.vote_count)})
          </p>

          <MoviesWatchlistBtn details={details} type={type} />

          <p className="text-gray-400 text-sm italic">{details?.tagline}</p>

          <div className="mt-8 hidden lg:block">
            <h2 className="text-lg font-bold text-[#353535] mb-2">Overview</h2>
            <span style={{ lineHeight: "1.25rem" }}>{details?.overview}</span>
          </div>
        </div>
      </div>
      <div className="mt-8 lg:hidden container mx-auto max-w-7xl px-4 my-5 grid">
        <h2 className="text-lg font-bold text-[#353535] mb-2">Overview</h2>
        <span style={{ lineHeight: "1.25rem" }}>{details?.overview}</span>
      </div>

      {casts.cast?.length > 0 && (
        <MoviesCast casts={casts?.cast} crews={casts?.crew} movie={details} />
      )}

      {reviews?.length > 0 && <MoviesReviews reviews={reviews} />}

      {recommendations?.length > 0 && (
        <div className="container mx-auto max-w-7xl px-4 my-5">
          <h2 className="text-lg font-semibold text-[#353535] mb-3">
            Recommendations
          </h2>
          <div className="flex overflow-x-scroll gap-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-white dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            {recommendations?.map((recommendation) => (
              <div
                key={recommendation.id}
                className="w-36 min-w-[140px] min-h-[200px] flex-shrink-0"
              >
                <MovieCard
                  item={recommendation}
                  type={recommendation.media_type}
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
