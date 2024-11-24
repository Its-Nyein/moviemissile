import { imagePath } from "../services/fetcher";
import fallback from "../assets/poster-fallback.jpg";

const MovieCard = ({ item }) => {
  const posterUrl = item.poster_path
    ? `${imagePath}/${item.poster_path}`
    : fallback;
  const releasedYear = item.release_date?.split("-")[0] || "unknown";
  return (
    <div className="relative">
      <img
        key={item.id}
        src={posterUrl}
        className="w-[150px] h-[210px] object-cover rounded-lg shadow mx-auto"
      />

      <div className="flex flex-col text-center gap-2 py-2">
        <p className="font-semibold text-[#353535] hover:text-gray-600 hover:scale-105 duration-0 cursor-pointer">
          {item.title || item.name}
        </p>
        <span className="text-sm text-gray-400">{releasedYear}</span>
      </div>
    </div>
  );
};

export default MovieCard;
