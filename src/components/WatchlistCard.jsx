import { imagePath } from "../services/fetcher";
import fallback from "../assets/poster-fallback.jpg";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const WatchlistCard = ({ item, type }) => {
  const posterUrl = item.poster_path
    ? `${imagePath}/${item.poster_path}`
    : fallback;

  const releasedYear =
    type === "tv"
      ? item.first_air_date?.split("-")[0] || "unknown"
      : item.release_date?.split("-")[0] || "unknown";

  return (
    <div className="flex gap-5">
      <Link to={`/${type}/${item?.id}`} className="block">
        <img
          key={item.id}
          src={posterUrl}
          alt={item.title || item.name}
          className="w-auto min-w-36 h-[210px] object-cover rounded-lg shadow mx-auto"
        />
      </Link>

      <div className="flex flex-col gap-2 py-2">
        <Link to={`/${type}/${item?.id}`} className="block">
          <h2 className="font-semibold text-gray-500 hover:text-[#353535]">
            {item?.title || item?.name}
          </h2>
        </Link>
        <span className="text-sm text-gray-400">{releasedYear}</span>
        <p className="flex gap-2 items-center">
          <FaStar className="text-yellow-400" />
          User Score - {item?.vote_average}/10
        </p>
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-[#353535] mb-2">Overview</h2>
          <p style={{ lineHeight: "1.25rem" }} className="hidden md:flex">
            {item?.overview}
          </p>
          <p className="md:hidden" style={{ lineHeight: "1rem" }}>
            {item?.overview?.length > 100
              ? `${item?.overview.slice(0, 120)} ...`
              : item?.overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WatchlistCard;
