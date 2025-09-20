import { useEffect, useState } from "react";
import { CiBookmarkMinus, CiBookmarkPlus } from "react-icons/ci";
import { useAuth } from "../../context/useAuth";
import { useFirestore } from "../../services/firestore";
import { useNavigate } from "react-router-dom";
import Toast from "../../UI/Toast";
import type { MovieDetails, MediaType } from "../../types";

interface MoviesWatchlistBtnProps {
  details: MovieDetails;
  type: MediaType;
}

const MoviesWatchlistBtn = ({ details, type }: MoviesWatchlistBtnProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToWatchlist, checkIsInWatchlist, removeFromWatchlist } =
    useFirestore();

  const [isInWatchlist, setIsInWatchlist] = useState<boolean | null>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("info");
  const [isWatchlistLoading, setIsWatchlistLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid || !details?.id) {
      setIsWatchlistLoading(false);
      return;
    }

    if (user?.uid || details?.id) {
      const checkWatchlistStatus = async () => {
        try {
          const exists = await checkIsInWatchlist(
            user?.uid,
            details.id?.toString(),
          );
          setIsInWatchlist(exists);
        } catch (error) {
          console.error("Error checking watchlist status:", error);
        } finally {
          setIsWatchlistLoading(false);
        }
      };
      checkWatchlistStatus();
    }
  }, [user?.uid, details?.id, checkIsInWatchlist]);

  const showToast = (message: string, type: string) => {
    setToastMessage(message);
    setToastType(type);
  };

  const handleOnSaveWatchlist = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const data = {
      id: details?.id,
      title: details?.title || details?.name,
      type: type,
      poster_path: details?.poster_path,
      release_date: details?.release_date || details?.first_air_date,
      vote_average: details?.vote_average,
      overview: details?.overview,
    };

    const dataId = details?.id?.toString();
    try {
      await addToWatchlist(user.uid, dataId, data);
      setIsInWatchlist(true);
      showToast(
        isInWatchlist
          ? "Already added to your watchlist"
          : "Successfully added to your watchlist",
        "success",
      );
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      showToast("Something went wrong while adding to watchlist", "error");
    }
  };

  const handleOnRemoveWatchlist = async () => {
    if (!user) return;

    const dataId = details?.id?.toString();
    try {
      await removeFromWatchlist(user.uid, dataId);
      setIsInWatchlist(false);
      showToast("Successfully removed from your watchlist", "success");
    } catch (error) {
      console.error("Error removing from watchlist:", error);
      showToast("Something went wrong while removing from watchlist", "error");
    }
  };

  if (isWatchlistLoading) {
    return (
      <div className="text-sm text-[#01b4e4] items-center my-2">
        Loading ...
      </div>
    );
  }

  if (user && isInWatchlist === null) {
    return (
      <div className="text-sm text-[#01b4e4] items-center my-2">
        Loading ...
      </div>
    );
  }

  return (
    <div>
      {isInWatchlist ? (
        <button
          className="relative flex gap-1 border border-[#01b4e4] mb-3 p-2 overflow-hidden group"
          onClick={handleOnRemoveWatchlist}
        >
          <div className="absolute inset-0 bg-[#01b4e4] -z-10 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-in-out"></div>
          <CiBookmarkMinus className="group-hover:text-white" />
          <span className="group-hover:text-white transition-all duration-300 ease-in-out">
            Remove from watchlist
          </span>
        </button>
      ) : (
        <button
          className="relative flex gap-1 border border-[#01b4e4] mb-3 p-2 overflow-hidden group"
          onClick={handleOnSaveWatchlist}
        >
          <div className="absolute inset-0 bg-[#01b4e4] -z-10 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-in-out"></div>
          <CiBookmarkPlus className="group-hover:text-white" />
          <span className="group-hover:text-white transition-all duration-300 ease-in-out">
            Add to watchlist
          </span>
        </button>
      )}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType as "success" | "error" | "info"}
          onClose={() => setToastMessage("")}
        />
      )}
    </div>
  );
};

export default MoviesWatchlistBtn;
