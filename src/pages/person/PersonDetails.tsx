import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../UI/LoadingSpinner";
import MovieCard from "../../components/MovieCard";
import {
  formatBirthday,
  formatPopularity,
  getGender,
} from "../../helpers/helpers";
import {
  fetchPersonDetails,
  fetchPersonMovieCredits,
  imagePath,
} from "../../services/fetcher";
import type { MovieCredit, Person } from "../../types";

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
    return (
      <p className="text-center mt-4 text-muted-foreground">
        Person not found.
      </p>
    );
  }

  return (
    <Fragment>
      <div className="container mx-auto max-w-7xl px-4 py-8 grid grid-cols-12 gap-5">
        <div className="col-span-4">
          <img
            src={`${imagePath}/${person?.profile_path}`}
            alt={person?.name}
            className="w-full object-cover rounded-lg shadow"
          />
        </div>
        <div className="col-span-8">
          <div className="gap-2 mb-3 text-sm md:text-base">
            <h4 className="text-foreground font-bold">Name</h4>
            <p className="text-muted-foreground">{person?.name}</p>
          </div>

          <div className="gap-2 mb-3 text-sm md:text-base">
            <h4 className="text-foreground font-bold">Known For</h4>
            <p className="text-muted-foreground">
              {person?.known_for_department}
            </p>
          </div>

          <div className="gap-2 mb-3 text-sm md:text-base">
            <h4 className="text-foreground font-bold">Popularity</h4>
            <p className="text-muted-foreground">
              {formatPopularity(person?.popularity)}
            </p>
          </div>

          <div className="gap-2 mb-3 text-sm md:text-base">
            <h4 className="text-foreground font-bold">Gender</h4>
            <p className="text-muted-foreground">{getGender(person?.gender)}</p>
          </div>

          <div className="gap-2 mb-3 text-sm md:text-base">
            <h4 className="text-foreground font-bold">Birthday</h4>
            <p className="text-muted-foreground">
              {formatBirthday(person?.birthday || "")}
            </p>
          </div>

          {person?.place_of_birth && (
            <div className="gap-2 mb-3 text-sm md:text-base">
              <h4 className="text-foreground font-bold">Place of Birth</h4>
              <p className="text-muted-foreground">{person?.place_of_birth}</p>
            </div>
          )}

          {person?.also_known_as && person.also_known_as.length > 0 && (
            <div className="gap-2 mb-3 text-sm md:text-base">
              <h4 className="text-foreground font-bold">Also Known As</h4>
              {person?.also_known_as?.map((item: string, index: number) => (
                <p key={index} className="text-muted-foreground mb-1">
                  {item}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {person?.biography && (
        <div className="mt-8 container mx-auto max-w-7xl px-4 my-5">
          <h2 className="text-lg font-bold text-foreground mb-2">Biography</h2>
          <span className="text-muted-foreground leading-relaxed">
            {biography
              ? person?.biography
              : person?.biography?.slice(0, 320) + "..."}
            <button
              onClick={toggleBiography}
              className="text-primary font-semibold ml-1 hover:underline"
            >
              {biography ? "See Less" : "See More"}
            </button>
          </span>
        </div>
      )}

      {movies?.length > 0 && (
        <div className="container mx-auto max-w-7xl px-4 my-5">
          <h2 className="text-lg font-semibold text-foreground mb-3">
            Known For Movies
          </h2>
          <div className="flex overflow-x-auto gap-3 pb-2">
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
