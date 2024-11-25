import { generatePoster } from "../../helpers/helpers";

const MoviesCastsItem = ({ cast }) => {
  return (
    <div className="relative w-50 h-[250px] shadow-md rounded">
      <div className="h-44 overflow-hidden">
        <img
          src={generatePoster(cast?.profile_path)}
          alt={cast?.name}
          className="object-cover w-full h-full rounded-t-lg"
        />
      </div>

      <div className="py-2 px-2">
        <p className="mb-0 font-semibold text-sm">{cast.name}</p>
        <p className="mb-0 text-sm">{cast.character}</p>
      </div>
    </div>
  );
};

export default MoviesCastsItem;
