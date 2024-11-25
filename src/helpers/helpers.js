import fallback from "../assets/poster-fallback.jpg";
import { imagePathOriginal } from "../services/fetcher";

export const formatNumber = (num) => {
  return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const generatePoster = (path) => {
  return path ? `${imagePathOriginal}/${path}` : fallback;
};
