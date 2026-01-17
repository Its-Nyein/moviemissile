import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Film,
  MapPin,
  TrendingUp,
  User,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../UI/LoadingSpinner";
import fallback from "../../assets/poster-fallback.jpg";
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
  const [biographyExpanded, setBiographyExpanded] = useState(false);
  const [aliasesExpanded, setAliasesExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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

  const calculateAge = (birthday: string): number | null => {
    if (!birthday) return null;
    const birth = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  const topMovies = useMemo(() => {
    return [...movies]
      .sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0))
      .slice(0, 12);
  }, [movies]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!person) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center">
        <User className="text-muted-foreground mb-4 h-16 w-16" />
        <p className="text-muted-foreground text-xl">Person not found.</p>
      </div>
    );
  }

  const profileUrl = person.profile_path
    ? `${imagePath}/${person.profile_path}`
    : fallback;

  const age = calculateAge(person.birthday || "");

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden">
        <div className="from-primary/10 via-background to-background absolute inset-0 bg-linear-to-b" />
        <div className="from-primary/20 absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] via-transparent to-transparent opacity-50" />

        <div className="relative container mx-auto max-w-7xl px-4 pt-8 pb-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            <div className="mx-auto shrink-0 lg:mx-0">
              <div className="group relative">
                <div className="from-primary/50 to-primary/30 absolute -inset-1 rounded-2xl bg-linear-to-r opacity-25 blur transition duration-500 group-hover:opacity-40" />
                <div className="relative">
                  {!imageLoaded && (
                    <div className="bg-muted aspect-2/3 w-64 animate-pulse rounded-xl md:w-72" />
                  )}
                  <img
                    src={profileUrl}
                    alt={person.name}
                    className={`aspect-2/3 w-64 rounded-xl object-cover shadow-2xl transition-all duration-300 md:w-72 ${
                      imageLoaded ? "block" : "hidden"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <div className="mb-6">
                <div className="bg-primary/10 text-primary mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium">
                  <Clapperboard className="h-4 w-4" />
                  {person.known_for_department}
                </div>
                <h1 className="text-foreground mb-2 text-3xl font-bold md:text-4xl lg:text-5xl">
                  {person.name}
                </h1>
                {person.place_of_birth && (
                  <div className="text-muted-foreground flex items-center justify-center gap-2 lg:justify-start">
                    <MapPin className="h-4 w-4" />
                    <span>{person.place_of_birth}</span>
                  </div>
                )}
              </div>

              <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
                <div className="bg-card border-border rounded-xl border p-4 text-center">
                  <TrendingUp className="text-primary mx-auto mb-2 h-5 w-5" />
                  <p className="text-foreground text-2xl font-bold">
                    {formatPopularity(person.popularity)}
                  </p>
                  <p className="text-muted-foreground text-xs">Popularity</p>
                </div>

                <div className="bg-card border-border rounded-xl border p-4 text-center">
                  <Film className="text-primary mx-auto mb-2 h-5 w-5" />
                  <p className="text-foreground text-2xl font-bold">
                    {movies.length}
                  </p>
                  <p className="text-muted-foreground text-xs">Credits</p>
                </div>

                <div className="bg-card border-border rounded-xl border p-4 text-center">
                  <User className="text-primary mx-auto mb-2 h-5 w-5" />
                  <p className="text-foreground text-2xl font-bold">
                    {getGender(person.gender)}
                  </p>
                  <p className="text-muted-foreground text-xs">Gender</p>
                </div>

                <div className="bg-card border-border rounded-xl border p-4 text-center">
                  <Calendar className="text-primary mx-auto mb-2 h-5 w-5" />
                  <p className="text-foreground text-2xl font-bold">
                    {age ?? "N/A"}
                  </p>
                  <p className="text-muted-foreground text-xs">Years Old</p>
                </div>
              </div>

              <div className="mb-6 flex flex-wrap justify-center gap-2 lg:justify-start">
                {person.birthday && (
                  <span className="bg-muted inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm">
                    {formatBirthday(person.birthday)}
                  </span>
                )}
                {person.also_known_as && person.also_known_as.length > 0 && (
                  <span className="bg-muted inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm">
                    {person.also_known_as.length} aliases
                  </span>
                )}
              </div>

              {person.also_known_as && person.also_known_as.length > 0 && (
                <div className="hidden lg:block">
                  <p className="text-muted-foreground text-sm">
                    <span className="text-foreground font-medium">
                      Also known as:{" "}
                    </span>
                    {aliasesExpanded
                      ? person.also_known_as.join(", ")
                      : person.also_known_as.slice(0, 3).join(", ")}
                    {person.also_known_as.length > 3 && (
                      <button
                        onClick={() => setAliasesExpanded(!aliasesExpanded)}
                        className="text-primary ml-1 font-medium hover:underline"
                      >
                        {aliasesExpanded
                          ? "Show less"
                          : `+${person.also_known_as.length - 3} more`}
                      </button>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {person.biography && (
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="bg-card border-border rounded-2xl border p-6 md:p-8">
            <h2 className="text-foreground mb-4 flex items-center gap-2 text-xl font-bold">
              <User className="text-primary h-5 w-5" />
              Biography
            </h2>
            <div className="relative">
              <p
                className={`text-muted-foreground leading-relaxed whitespace-pre-line transition-all duration-300 ${
                  !biographyExpanded && person.biography.length > 500
                    ? "line-clamp-4"
                    : ""
                }`}
              >
                {person.biography}
              </p>
              {person.biography.length > 500 && (
                <button
                  onClick={() => setBiographyExpanded(!biographyExpanded)}
                  className="text-primary mt-4 flex items-center gap-1 font-medium transition-colors hover:underline"
                >
                  {biographyExpanded ? (
                    <>
                      Show Less <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Read More <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {topMovies.length > 0 && (
        <div className="container mx-auto max-w-7xl py-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-foreground flex items-center text-xl font-bold">
              Known For Movies
            </h2>
            <span className="text-muted-foreground text-sm">
              {movies.length} total credits
            </span>
          </div>
          <div className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4">
            {topMovies.map((mov) => (
              <div
                key={mov.id}
                className="w-40 min-w-[160px] shrink-0 snap-start"
              >
                <MovieCard item={mov} type="movie" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
