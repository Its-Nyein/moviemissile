import axios from "axios";
import type {
  Movie,
  MovieDetails,
  Credits,
  Review,
  TrendingResponse,
  SearchResponse,
  DiscoverResponse,
  Person,
  PersonMovieCredits,
  TimeWindow,
  MediaType,
  SortBy,
} from "../types";

export const imagePath = "https://image.tmdb.org/t/p/w500";
export const imagePathOriginal = "https://image.tmdb.org/t/p/original";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_API_KEY;

export const fetchAllMovies = async (
  timeWindow: TimeWindow = "day"
): Promise<Movie[]> => {
  const { data } = await axios.get<TrendingResponse>(
    `${baseUrl}/trending/all/${timeWindow}?api_key=${apiKey}`
  );

  return data?.results || [];
};

export const fetchMoviesDetails = async (
  type: MediaType,
  id: number
): Promise<MovieDetails> => {
  const res = await axios.get<MovieDetails>(
    `${baseUrl}/${type}/${id}?api_key=${apiKey}`
  );

  return res?.data;
};

export const fetchMoviesCast = async (
  type: MediaType,
  id: number
): Promise<Credits> => {
  const res = await axios.get<Credits>(
    `${baseUrl}/${type}/${id}/credits?api_key=${apiKey}`
  );

  return res?.data;
};

export const fetchMoviesReviews = async (
  type: MediaType,
  id: number
): Promise<Review[]> => {
  const res = await axios.get<{ results: Review[] }>(
    `${baseUrl}/${type}/${id}/reviews?api_key=${apiKey}`
  );

  return res?.data?.results || [];
};

export const fetchMoviesRecommendations = async (
  type: MediaType,
  id: number
): Promise<Movie[]> => {
  const res = await axios.get<TrendingResponse>(
    `${baseUrl}/${type}/${id}/recommendations?api_key=${apiKey}`
  );

  return res.data?.results || [];
};

export const fetchMoviesDiscovers = async (
  page: number,
  sortBy: SortBy
): Promise<DiscoverResponse> => {
  const res = await axios.get<DiscoverResponse>(
    `${baseUrl}/discover/movie?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`
  );

  return res?.data;
};

export const fetchTvSeriesDiscovers = async (
  page: number,
  sortBy: SortBy
): Promise<DiscoverResponse> => {
  const res = await axios.get<DiscoverResponse>(
    `${baseUrl}/discover/tv?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`
  );

  return res?.data;
};

export const fetchSearchMovies = async (
  q: string,
  page: number
): Promise<SearchResponse> => {
  const res = await axios.get<SearchResponse>(
    `${baseUrl}/search/multi?api_key=${apiKey}&query=${q}&page=${page}`
  );

  return res?.data;
};

export const fetchPersonDetails = async (id: number): Promise<Person> => {
  const res = await axios.get<Person>(
    `${baseUrl}/person/${id}?api_key=${apiKey}`
  );
  return res?.data;
};

export const fetchPersonMovieCredits = async (
  id: number
): Promise<PersonMovieCredits> => {
  const res = await axios.get<PersonMovieCredits>(
    `${baseUrl}/person/${id}/movie_credits?api_key=${apiKey}`
  );
  return res?.data;
};
