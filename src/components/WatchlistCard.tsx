import { Calendar, Play, Star } from "lucide-react";
import { Link } from "react-router-dom";
import fallback from "../assets/poster-fallback.jpg";
import { imagePath } from "../services/fetcher";
import type { WatchlistItem } from "../types";

const WatchlistCard = ({
  item,
  type,
}: {
  item: WatchlistItem;
  type: string;
}) => {
  const posterUrl = item.poster_path
    ? `${imagePath}/${item.poster_path}`
    : fallback;

  const releasedYear =
    type === "tv"
      ? item.first_air_date?.split("-")[0] || "unknown"
      : item.release_date?.split("-")[0] || "unknown";

  return (
    <div className="group glass rounded-xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex">
        <Link
          to={`/${type}/${item?.id}`}
          className="relative block shrink-0 overflow-hidden"
        >
          <img
            key={item.id}
            src={posterUrl}
            alt={item.title || item.name}
            className="w-32 sm:w-40 h-[180px] object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <Play className="h-5 w-5 text-white" fill="white" />
            </div>
          </div>
        </Link>

        <div className="flex flex-col gap-2 p-4 flex-1 min-w-0">
          <Link to={`/${type}/${item?.id}`} className="block">
            <h2 className="font-semibold text-lg text-foreground hover:text-primary transition-colors line-clamp-1">
              {item?.title || item?.name}
            </h2>
          </Link>

          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {releasedYear}
            </span>
            <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-lg px-2 py-0.5">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-foreground">
                {item?.vote_average?.toFixed(1)}
              </span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">
              {type === "tv" ? "TV Show" : "Movie"}
            </span>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mt-1">
            {item?.overview || "No overview available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WatchlistCard;
