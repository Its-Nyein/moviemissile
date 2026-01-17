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
      <div className="bg-muted relative overflow-hidden rounded-lg">
        {/* Skeleton loader */}
        {!imageLoaded && (
          <div className="bg-muted aspect-2/3 w-full animate-pulse" />
        )}

        {/* Poster image */}
        <img
          key={item.id}
          src={posterUrl}
          alt={item.title || item.name}
          className={cn(
            "aspect-2/3 w-full object-cover transition-transform duration-300 group-hover:scale-105",
            imageLoaded ? "block" : "hidden"
          )}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Rating badge */}
        {rating && rating !== "0.0" && (
          <div className="absolute top-2 left-2 flex items-center gap-1 rounded bg-black/70 px-1.5 py-0.5">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium text-white">{rating}</span>
          </div>
        )}
      </div>

      {/* Info below card */}
      <div className="mt-2">
        <p className="text-foreground line-clamp-1 text-sm font-medium">
          {item.title || item.name}
        </p>
        <p className="text-muted-foreground mt-0.5 text-xs">{releasedYear}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
