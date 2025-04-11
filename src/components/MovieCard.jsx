import { imagePath } from "../services/fetcher";
import fallback from "../assets/poster-fallback.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import SkeletonLoader from "../UI/SkeletonLoader";

const MovieCard = ({ item, type }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const posterUrl = item.poster_path
    ? `${imagePath}/${item.poster_path}`
    : fallback;
  const releasedYear =
    type === "tv"
      ? item.first_air_date?.split("-")[0] || "unknown"
      : item.release_date?.split("-")[0] || "unknown";
  return (
    <div className="relative flex flex-col items-center">
      <Link to={`/${type}/${item?.id}`} className="block">
        {!imageLoaded && <SkeletonLoader />}
        <img
          key={item.id}
          src={posterUrl}
          alt={item.title || item.name}
          className={`h-[220px] w-auto object-cover rounded-lg shadow mx-auto ${
            imageLoaded ? "" : "hidden"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </Link>

      <div className="flex flex-col text-center gap-2 py-2">
        <Link to={`/${type}/${item?.id}`}>
          <p className="font-semibold text-[#353535] hover:text-gray-600 hover:scale-105 duration-0 cursor-pointer">
            {item.title || item.name}
          </p>
        </Link>
        <span className="text-sm text-gray-400">{releasedYear}</span>
      </div>
    </div>
  );
};

export default MovieCard;
