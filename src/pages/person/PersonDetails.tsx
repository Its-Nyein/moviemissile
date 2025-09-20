import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchPersonDetails,
  fetchPersonMovieCredits,
  imagePath,
} from "../../services/fetcher";
import LoadingSpinner from "../../UI/LoadingSpinner";
import {
  formatBirthday,
  formatPopularity,
  getGender,
} from "../../helpers/helpers";
import MovieCard from "../../components/MovieCard";
import type { Person, MovieCredit } from "../../types";

export const PersonDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [person, setPerson] = useState<Person | null>(null);
  const [movies, setMovies] = useState<MovieCredit[]>([]);
  const [loading, setLoading] = useState(true);
  const [biography, setBiography] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const [personDetailsData, personMoviesData] = await Promise.all([
          fetchPersonDetails(parseInt(id!)),
          fetchPersonMovieCredits(parseInt(id!)),
        ]);
        setPerson(personDetailsData);
        setMovies(personMoviesData?.cast || []);
      } catch (error) {
        console.error("Error fetching person details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const toggleBiography = () => {
    setBiography((prev) => !prev);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!person) {
    return <p className="text-center mt-4 text-gray-500">Person not found.</p>;
  }

  return (
    <Fragment>
      <div className="container mx-auto max-w-7xl px-4 my-5 grid grid-cols-12 gap-5">
        <div className="col-span-4">
          <img
            src={`${imagePath}/${person?.profile_path}`}
            className="object-cover rounded-lg shadow"
          />
        </div>
        <div className="col-span-8 mt-0 mt-md-2 mt-xl-4">
          <div className="gap-2 mb-3 items-center text-sm md:text-lg">
            <h4 className="text-[#353535] font-bold">Name</h4>
            <p>{person?.name}</p>
          </div>

          <div className="gap-2 mb-3 items-center text-sm md:text-lg">
            <h4 className="text-[#353535] font-bold">Known For</h4>
            <p>{person?.known_for_department}</p>
          </div>

          <div className="gap-2 mb-3 items-center text-sm md:text-lg">
            <h4 className="text-[#353535] font-bold">Popularity</h4>
            <div className="flex items-center gap-2">
              <p>{formatPopularity(person?.popularity)}</p>
              {/* <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{
                    width: `${Math.min(person?.popularity * 10, 100)}%`,
                  }}
                ></div>
              </div> */}
            </div>
          </div>

          <div className="gap-2 mb-3 items-center text-sm md:text-lg">
            <h4 className="text-[#353535] font-bold">Gender</h4>
            <p>{getGender(person?.gender)}</p>
          </div>

          <div className="gap-2 mb-3 items-center text-sm md:text-lg">
            <h4 className="text-[#353535] font-bold">Birthday</h4>
            <p>{formatBirthday(person?.birthday || "")}</p>
          </div>

          {person?.place_of_birth && (
            <div className="gap-2 mb-3 items-center text-sm md:text-lg">
              <h4 className="text-[#353535] font-bold">Place of Birth</h4>
              <p>{person?.place_of_birth}</p>
            </div>
          )}

          {person?.also_known_as && person.also_known_as.length > 0 && (
            <div className="gap-2 mb-3 items-center text-sm md:text-lg">
              <h4 className="text-[#353535] font-bold">Also Known As</h4>
              {person?.also_known_as?.map((item: string, index: number) => {
                return (
                  <div key={index}>
                    <p className="mb-1">{item}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {person?.biography && (
        <div className="mt-8 container mx-auto max-w-7xl px-4 my-5 grid">
          <h2 className="text-lg font-bold text-[#353535] mb-2">Biography</h2>
          <span style={{ lineHeight: "1.25rem" }}>
            {biography
              ? person?.biography
              : person?.biography?.slice(0, 320) + "..."}
            <button
              onClick={toggleBiography}
              className="text-blue-500 font-semibold"
            >
              {biography ? "See Less" : "See More"}
            </button>
          </span>
        </div>
      )}

      {movies?.length > 0 && (
        <div className="container mx-auto max-w-7xl px-4 my-5">
          <h2 className="text-lg font-semibold text-[#353535] mb-3">
            Known For Movies
          </h2>
          <div className="flex overflow-x-scroll gap-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-white dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            {movies?.map((mov) => (
              <div
                key={mov.id}
                className="w-36 min-w-[140px] min-h-[200px] flex-shrink-0"
              >
                <MovieCard item={mov} type="movie" />
              </div>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};
