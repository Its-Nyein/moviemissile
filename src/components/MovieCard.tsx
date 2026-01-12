import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import fallback from "../assets/poster-fallback.jpg";
import { imagePath } from "../services/fetcher";
import type { MediaType, Movie } from "../types";

interface MovieCardProps {
  item: Movie;
  type?: MediaType;
}

const MovieCard = ({ item, type }: MovieCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const posterUrl = item.poster_path
    ? `${imagePath}/${item.poster_path}`
    : fallback;
  const releasedYear =
    type === "tv"
      ? item.first_air_date?.split("-")[0] || ""
      : item.release_date?.split("-")[0] || "";

  const rating = item.vote_average?.toFixed(1);

  return (
    <Link to={`/${type}/${item?.id}`} className="group block">
      <div className="relative overflow-hidden rounded-lg bg-muted">
        {/* Skeleton loader */}
        {!imageLoaded && (
          <div className="aspect-[2/3] w-full bg-muted animate-pulse" />
        )}

        {/* Poster image */}
        <img
          key={item.id}
          src={posterUrl}
          alt={item.title || item.name}
          className={cn(
            "aspect-[2/3] w-full object-cover transition-transform duration-300 group-hover:scale-105",
            imageLoaded ? "block" : "hidden"
          )}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Rating badge */}
        {rating && rating !== "0.0" && (
          <div className="absolute top-2 left-2 bg-black/70 rounded px-1.5 py-0.5 flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-white text-xs font-medium">{rating}</span>
          </div>
        )}
      </div>

      {/* Info below card */}
      <div className="mt-2">
        <p className="font-medium text-foreground line-clamp-1 text-sm">
          {item.title || item.name}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {releasedYear}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
