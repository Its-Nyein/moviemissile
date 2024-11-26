import { useState } from "react";
import { formatNumber, generatePoster } from "../../helpers/helpers";
import MoviesCastsItem from "./MoviesCastsItem";
import { FaAnglesRight } from "react-icons/fa6";

const MoviesCast = ({ casts, crews, movie }) => {
  const [visibleCasts, setVisibleCasts] = useState(9);

  const loadMore = () => {
    setVisibleCasts((prev) => {
      const newVisibleCasts = prev + 9;
      return newVisibleCasts > casts?.length ? casts.length : newVisibleCasts;
    });
  };

  const remainingCasts = casts?.length - visibleCasts;

  const directors = crews?.filter((crew) => crew.job === "Director");
  const budget =
    movie?.budget != null && movie?.budget !== 0 && movie?.type === "movie"
      ? "$" + formatNumber(movie?.budget)
      : "-";

  const revenue =
    movie?.revenue != null && movie?.revenue !== 0 && movie?.type === "movie"
      ? "$" + formatNumber(movie?.revenue)
      : "-";

  return (
    <div className="container mx-auto max-w-7xl grid grid-cols-12 px-4 my-10">
      <div className="col-span-12 md:col-span-8 lg:col-span-9">
        <h2 className="text-lg font-semibold text-[#353535] mb-3">Casts</h2>
        <div className="flex overflow-x-scroll overflow-y-hidden gap-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-white dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
          {casts?.slice(0, visibleCasts).map((cast) => (
            <div
              key={cast.id}
              className="w-36 min-w-[140px] min-h-[200px] flex-shrink-0"
            >
              <MoviesCastsItem cast={cast} />
            </div>
          ))}
          {remainingCasts > 0 && (
            <div className="mt-4 w-36 min-w-[140px]">
              <p
                className="flex mt-[100px] gap-3 cursor-pointer font-semibold text-[#353535] hover:text-gray-400 items-center"
                onClick={loadMore}
              >
                View All{" "}
                <span>
                  <FaAnglesRight />
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="col-span-12 md:col-span-4 lg:col-span-3 md:ml-4">
        <div className="mb-4">
          <p className="text-lg font-semibold text-[#353535] mb-3">Directors</p>
          {directors?.slice(0, 3).map((director) => (
            <div key={director.id} className="flex gap-2 mb-2">
              <img
                src={generatePoster(director.profile_path)}
                alt="Dire Profile"
                className="object-cover w-auto h-12 rounded-lg"
              />
              <span className="mt-4">{director?.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-12">
          <div className="col-span-4">
            <span className="font-bold">Status</span>
          </div>
          <div className="col-span-8">{movie?.status}</div>
        </div>

        <div className="mt-3 grid grid-cols-12">
          <div className="col-span-4">
            <span className="font-bold">Budget</span>
          </div>
          <div className="col-span-8">{budget}</div>
        </div>

        <div className="mt-3 grid grid-cols-12">
          <div className="col-span-4">
            <span className="font-bold">Revenue</span>
          </div>
          <div className="col-span-8">{revenue}</div>
        </div>
      </div>
    </div>
  );
};

export default MoviesCast;
