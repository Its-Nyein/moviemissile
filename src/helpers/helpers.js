import fallback from "../assets/poster-fallback.jpg";
import { imagePathOriginal } from "../services/fetcher";
import profileFallback from "../assets/fallback-img.png";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatNumber = (num) => {
  return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const generatePoster = (path) => {
  return path ? `${imagePathOriginal}/${path}` : fallback;
};

export const generateProfile = (path) => {
  return path !== null ? `${imagePathOriginal}/${path}` : profileFallback;
};

export const generateRating = (rating) => {
  if (rating) {
    return rating.toString().includes(".") ? rating : `${rating}.0`;
  } else {
    return null;
  }
};

export const generateDate = (createdAt) => {
  const dateObj = new Date(createdAt);
  return `${
    months[dateObj.getMonth()]
  } ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
};
