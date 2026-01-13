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
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <User className="h-16 w-16 text-muted-foreground mb-4" />
        <p className="text-xl text-muted-foreground">Person not found.</p>
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
        <div className="absolute inset-0 bg-linear-to-b from-primary/10 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />

        <div className="container mx-auto max-w-7xl px-4 pt-8 pb-12 relative">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="shrink-0 mx-auto lg:mx-0">
              <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-primary/50 to-primary/30 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500" />
                <div className="relative">
                  {!imageLoaded && (
                    <div className="w-64 md:w-72 aspect-2/3 bg-muted animate-pulse rounded-xl" />
                  )}
                  <img
                    src={profileUrl}
                    alt={person.name}
                    className={`w-64 md:w-72 aspect-2/3 object-cover rounded-xl shadow-2xl transition-all duration-300 ${
                      imageLoaded ? "block" : "hidden"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-3">
                  <Clapperboard className="h-4 w-4" />
                  {person.known_for_department}
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                  {person.name}
                </h1>
                {person.place_of_birth && (
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{person.place_of_birth}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                <div className="bg-card border border-border rounded-xl p-4 text-center">
                  <TrendingUp className="h-5 w-5 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">
                    {formatPopularity(person.popularity)}
                  </p>
                  <p className="text-xs text-muted-foreground">Popularity</p>
                </div>

                <div className="bg-card border border-border rounded-xl p-4 text-center">
                  <Film className="h-5 w-5 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">
                    {movies.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Credits</p>
                </div>

                <div className="bg-card border border-border rounded-xl p-4 text-center">
                  <User className="h-5 w-5 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">
                    {getGender(person.gender)}
                  </p>
                  <p className="text-xs text-muted-foreground">Gender</p>
                </div>

                <div className="bg-card border border-border rounded-xl p-4 text-center">
                  <Calendar className="h-5 w-5 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">
                    {age ?? "N/A"}
                  </p>
                  <p className="text-xs text-muted-foreground">Years Old</p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                {person.birthday && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full text-sm">
                    {formatBirthday(person.birthday)}
                  </span>
                )}
                {person.also_known_as && person.also_known_as.length > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full text-sm">
                    {person.also_known_as.length} aliases
                  </span>
                )}
              </div>

              {person.also_known_as && person.also_known_as.length > 0 && (
                <div className="hidden lg:block">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Also known as:{" "}
                    </span>
                    {aliasesExpanded
                      ? person.also_known_as.join(", ")
                      : person.also_known_as.slice(0, 3).join(", ")}
                    {person.also_known_as.length > 3 && (
                      <button
                        onClick={() => setAliasesExpanded(!aliasesExpanded)}
                        className="ml-1 text-primary hover:underline font-medium"
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
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
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
                  className="mt-4 flex items-center gap-1 text-primary font-medium hover:underline transition-colors"
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground flex items-center">
              Known For Movies
            </h2>
            <span className="text-sm text-muted-foreground">
              {movies.length} total credits
            </span>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
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
