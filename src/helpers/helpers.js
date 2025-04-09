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

export const getGender = (gender) => {
    switch (gender) {
      case 1:
        return "Female";
      case 2:
        return "Male";
      case 3:
        return "Non-binary";
      default:
        return "Not specified";
    }
  }

export const formatBirthday = (birthday) => {
    if (!birthday) return "N/A";
    const birthDate = new Date(birthday);
    const now = new Date();
    const age = now.getFullYear() - birthDate.getFullYear();
    const isBirthdayPassed =
      now.getMonth() > birthDate.getMonth() ||
      (now.getMonth() === birthDate.getMonth() && now.getDate() >= birthDate.getDate());
    const calculatedAge = isBirthdayPassed ? age : age - 1;

    return `${birthDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })} (${calculatedAge} years old)`;
  };

  export const formatPopularity = (popularity) => {
    return popularity ? popularity.toFixed(2) : "N/A";
  }