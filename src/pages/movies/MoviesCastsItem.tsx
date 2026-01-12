import { useState } from "react";
import { Link } from "react-router-dom";
import { generatePoster } from "../../helpers/helpers";
import type { CastMember } from "../../types";

const ImgSkeletonLoader = () => (
  <div className="h-44 w-full rounded-t-lg bg-muted animate-pulse" />
);

interface MoviesCastsItemProps {
  cast: CastMember;
}

const MoviesCastsItem = ({ cast }: MoviesCastsItemProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      to={`/person/${cast.id}`}
      className="block bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="h-44 overflow-hidden relative">
        {!imageLoaded && <ImgSkeletonLoader />}
        <img
          src={generatePoster(cast?.profile_path || "")}
          alt={cast?.name}
          className={`object-cover w-full h-full ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <div className="p-2">
        <p className="font-semibold text-sm text-foreground truncate">
          {cast.name}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {cast.character}
        </p>
      </div>
    </Link>
  );
};

export default MoviesCastsItem;
