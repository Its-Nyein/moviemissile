import axios from "axios";

export const imagePath = "https://image.tmdb.org/t/p/w500";
export const imagePathOriginal = "https://image.tmdb.org/t/p/original";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_API_KEY;

export const fetchAllMovies = async (timeWindow = "day") => {
  const { data } = await axios.get(
    `${baseUrl}/trending/all/${timeWindow}?api_key=${apiKey}`
  );

  return data?.results;
};

export const fetchMoviesDetails = async (type, id) => {
  const res = await axios.get(`${baseUrl}/${type}/${id}?api_key=${apiKey}`);

  return res?.data;
};

export const fetchMoviesCast = async (type, id) => {
  const res = await axios.get(
    `${baseUrl}/${type}/${id}/credits?api_key=${apiKey}`
  );

  return res?.data;
};

export const fetchMoviesReviews = async (type, id) => {
  const res = await axios.get(
    `${baseUrl}/${type}/${id}/reviews?api_key=${apiKey}`
  );

  return res?.data?.results;
};
