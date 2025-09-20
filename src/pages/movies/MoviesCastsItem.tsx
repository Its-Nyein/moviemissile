import { useState } from "react";
import { generatePoster } from "../../helpers/helpers";
import { Link } from "react-router-dom";
import type { CastMember } from "../../types";

const ImgSkeletonLoader = () => (
  <div className="h-44 w-full bg-gray-300 rounded-t-lg animate-pulse" />
);

interface MoviesCastsItemProps {
  cast: CastMember;
}

const MoviesCastsItem = ({ cast }: MoviesCastsItemProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      to={`/person/${cast.id}`}
      className="relative shadow-md rounded block"
    >
      <div className="h-44 overflow-hidden relative">
        {!imageLoaded && <ImgSkeletonLoader />}
        <img
          src={generatePoster(cast?.profile_path || "")}
          alt={cast?.name}
          className={`object-cover w-full h-full rounded-t-lg absolute top-0 left-0 transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <div className="py-2 px-2">
        <p className="mb-0 font-semibold text-sm">{cast.name}</p>
        <p className="mb-0 text-sm">{cast.character}</p>
      </div>
    </Link>
  );
};

export default MoviesCastsItem;
