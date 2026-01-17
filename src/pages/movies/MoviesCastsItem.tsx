import { useState } from "react";
import { Link } from "react-router-dom";
import { generatePoster } from "../../helpers/helpers";
import type { CastMember } from "../../types";

const ImgSkeletonLoader = () => (
  <div className="bg-muted h-44 w-full animate-pulse rounded-t-lg" />
);

interface MoviesCastsItemProps {
  cast: CastMember;
}

const MoviesCastsItem = ({ cast }: MoviesCastsItemProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      to={`/person/${cast.id}`}
      className="bg-card border-border block overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative h-44 overflow-hidden">
        {!imageLoaded && <ImgSkeletonLoader />}
        <img
          src={generatePoster(cast?.profile_path || "")}
          alt={cast?.name}
          className={`h-full w-full object-cover ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <div className="p-2">
        <p className="text-foreground truncate text-sm font-semibold">
          {cast.name}
        </p>
        <p className="text-muted-foreground truncate text-xs">
          {cast.character}
        </p>
      </div>
    </Link>
  );
};

export default MoviesCastsItem;
