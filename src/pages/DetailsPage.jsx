import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMoviesDetails, imagePath } from "../services/fetcher";
import LoadingSpinner from "../UI/LoadingSpinner";
import { SlCalender } from "react-icons/sl";
import { FaRegClock } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { formatNumber } from "../helpers/helpers";
import { CiBookmarkMinus, CiBookmarkPlus } from "react-icons/ci";

const DetailsPage = () => {
  const { type, id } = useParams();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchMoviesDetails(type, id)
      .then((res) => setDetails(res))
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
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

          <div className="flex mb-3">
            <div className="flex gap-2 mr-1 items-center">
              <SlCalender />
              <span>
                {new Date(releaseDate).toLocaleDateString("en-US")} (US)
              </span>
            </div>
            {type === "movie" && (
              <div className="flex gap-1">
                <div className="mx-2">*</div>
                <FaRegClock />
                <div>{minutesToHrs(details?.runtime)}</div>
              </div>
            )}
          </div>

          <p className="flex mb-3 gap-1">
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

          <button className="relative hidden gap-1 border border-[#01b4e4] mb-3 p-2 overflow-hidden group">
            <div className="absolute inset-0 bg-[#01b4e4] -z-10 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-in-out"></div>
            <CiBookmarkMinus className="group-hover:text-white" />
            <span className="group-hover:text-white transition-all duration-300 ease-in-out">
              Remove from watchlist
            </span>
          </button>

          <button className="relative flex gap-1 border border-[#01b4e4] mb-3 p-2 overflow-hidden group">
            <div className="absolute inset-0 bg-[#01b4e4] -z-10 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-in-out"></div>
            <CiBookmarkPlus className="group-hover:text-white" />
            <span className="group-hover:text-white transition-all duration-300 ease-in-out">
              Add to watchlist
            </span>
          </button>

          <p className="text-gray-400 text-sm italic">{details?.tagline}</p>

          <div className="mt-8 hidden lg:block">
            <h2 className="text-lg font-bold text-[#353535] mb-2">Overview</h2>
            <span>{details?.overview}</span>
          </div>
        </div>
      </div>
      <div className="mt-8 lg:hidden container mx-auto max-w-7xl px-4 my-5 grid">
        <h2 className="text-lg font-bold text-[#353535] mb-2">Overview</h2>
        <span>{details?.overview}</span>
      </div>
    </Fragment>
  );
};

export default DetailsPage;
