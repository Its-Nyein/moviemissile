// Firebase User import
import type { User as FirebaseUser } from "firebase/auth";

// Movie and TV Show types based on TMDb API
export interface Movie {
  id: number;
  title?: string;
  name?: string; // for TV shows
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string; // for TV shows
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  video?: boolean;
  original_language: string;
  original_title?: string;
  original_name?: string; // for TV shows
  media_type?: "movie" | "tv" | "person";
}

export interface MovieDetails extends Movie {
  budget?: number;
  revenue?: number;
  runtime?: number;
  status: string;
  tagline: string;
  homepage: string;
  imdb_id: string;
  genres: Genre[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  belongs_to_collection?: Collection;
  // TV Show specific fields
  number_of_episodes?: number;
  number_of_seasons?: number;
  seasons?: Season[];
  episode_run_time?: number[];
  in_production?: boolean;
  languages?: string[];
  last_air_date?: string;
  networks?: Network[];
  origin_country?: string[];
  type?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Collection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
}

export interface Network {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

// Cast and Crew types
export interface CastMember {
  id: number;
  name: string;
  character: string;
  credit_id: string;
  order: number;
  adult: boolean;
  gender: number;
  known_for_department: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  credit_id: string;
  adult: boolean;
  gender: number;
  known_for_department: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

export interface Credits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

// Review types
export interface Review {
  id: string;
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number | null;
  };
  content: string;
  created_at: string;
  updated_at: string;
  url: string;
}

// Person types
export interface Person {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  imdb_id: string;
  known_for_department: string;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string | null;
  adult: boolean;
  also_known_as?: string[];
}

export interface PersonMovieCredits {
  id: number;
  cast: MovieCredit[];
  crew: MovieCredit[];
}

export interface MovieCredit {
  id: number;
  title?: string;
  name?: string;
  character?: string;
  job?: string;
  department?: string;
  credit_id: string;
  release_date?: string;
  first_air_date?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  popularity: number;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  video?: boolean;
  vote_count: number;
  media_type?: "movie" | "tv";
}

// API Response types
export interface TrendingResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export type SearchResponse = TrendingResponse;

export type DiscoverResponse = TrendingResponse;

// Auth types (using Firebase User type)
export interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

// Watchlist types
export interface WatchlistItem {
  id: string;
  movieId: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  media_type: "movie" | "tv";
  userId: string;
  addedAt: Date;
  overview?: string;
}

// Component Props types
export interface PaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  className?: string;
  onPageChange: (page: number) => void;
}

export interface MovieCardProps {
  movie: Movie;
  onMovieClick?: (movie: Movie) => void;
}

export interface WatchlistCardProps {
  item: WatchlistItem;
  onRemove: (id: string) => void;
}

// Utility types
export type MediaType = "movie" | "tv";
export type TimeWindow = "day" | "week";
export type SortBy =
  | "popularity.desc"
  | "release_date.desc"
  | "vote_average.desc"
  | "title.asc";

// Environment variables
export interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
