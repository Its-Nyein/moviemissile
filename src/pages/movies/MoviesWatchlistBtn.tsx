import { Button } from "@/components/ui/button";
import { BookmarkMinus, BookmarkPlus, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../../context/useAuth";
import { useFirestore } from "../../services/firestore";
import type { MediaType, MovieDetails } from "../../types";

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
  const [isWatchlistLoading, setIsWatchlistLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);

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
            details.id?.toString()
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
    setIsActionLoading(true);
    try {
      await addToWatchlist(user.uid, dataId, data);
      setIsInWatchlist(true);
      toast.success(
        isInWatchlist
          ? "Already added to your watchlist"
          : "Added to your watchlist"
      );
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      toast.error("Something went wrong while adding to watchlist");
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleOnRemoveWatchlist = async () => {
    if (!user) return;

    const dataId = details?.id?.toString();
    setIsActionLoading(true);
    try {
      await removeFromWatchlist(user.uid, dataId);
      setIsInWatchlist(false);
      toast.success("Removed from your watchlist");
    } catch (error) {
      console.error("Error removing from watchlist:", error);
      toast.error("Something went wrong while removing from watchlist");
    } finally {
      setIsActionLoading(false);
    }
  };

  if (isWatchlistLoading || (user && isInWatchlist === null)) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground my-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="my-2">
      {isInWatchlist ? (
        <Button
          variant="outline"
          size="sm"
          onClick={handleOnRemoveWatchlist}
          disabled={isActionLoading}
        >
          {isActionLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <BookmarkMinus className="h-4 w-4 mr-2" />
          )}
          Remove from Watchlist
        </Button>
      ) : (
        <Button
          size="sm"
          onClick={handleOnSaveWatchlist}
          disabled={isActionLoading}
        >
          {isActionLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <BookmarkPlus className="h-4 w-4 mr-2" />
          )}
          Add to Watchlist
        </Button>
      )}
    </div>
  );
};

export default MoviesWatchlistBtn;
