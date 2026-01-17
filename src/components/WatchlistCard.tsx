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
    <div className="group glass border-border/50 hover:border-primary/30 hover:shadow-primary/5 overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg">
      <div className="flex">
        <Link
          to={`/${type}/${item?.id}`}
          className="relative block shrink-0 overflow-hidden"
        >
          <img
            key={item.id}
            src={posterUrl}
            alt={item.title || item.name}
            className="h-[180px] w-32 object-cover transition-transform duration-300 group-hover:scale-105 sm:w-40"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="gradient-bg flex h-12 w-12 scale-0 transform items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-100">
              <Play className="h-5 w-5 text-white" fill="white" />
            </div>
          </div>
        </Link>

        <div className="flex min-w-0 flex-1 flex-col gap-2 p-4">
          <Link to={`/${type}/${item?.id}`} className="block">
            <h2 className="text-foreground hover:text-primary line-clamp-1 text-lg font-semibold transition-colors">
              {item?.title || item?.name}
            </h2>
          </Link>

          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {releasedYear}
            </span>
            <span className="flex items-center gap-1 rounded-lg bg-black/40 px-2 py-0.5 backdrop-blur-sm">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-foreground font-medium">
                {item?.vote_average?.toFixed(1)}
              </span>
            </span>
            <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium capitalize">
              {type === "tv" ? "TV Show" : "Movie"}
            </span>
          </div>

          <p className="text-muted-foreground mt-1 line-clamp-3 text-sm leading-relaxed">
            {item?.overview || "No overview available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WatchlistCard;
