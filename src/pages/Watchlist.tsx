import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useFirestore } from "../services/firestore";
import LoadingSpinner from "../UI/LoadingSpinner";
import WatchlistCard from "../components/WatchlistCard";
import type { WatchlistItem } from "../types";

const Watchlist = () => {
  const { user } = useAuth();
  const { getWatchlistData } = useFirestore();

  const [watchlistData, setWatctlistData] = useState<WatchlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user?.uid) return;

    setIsLoading(true);
    getWatchlistData(user.uid)
      .then((res) => {
        // Transform the data to match WatchlistItem interface
        const transformedData = res.map((item: Record<string, unknown>) => ({
          id: item.id?.toString() || item.movieId?.toString(),
          movieId: item.movieId || item.id,
          title: item.title,
          name: item.name,
          poster_path: item.poster_path,
          release_date: item.release_date,
          first_air_date: item.first_air_date,
          vote_average: item.vote_average,
          media_type: item.media_type || item.type,
          userId: user.uid,
          addedAt: item.addedAt || new Date(),
          overview: item.overview,
        }));
        setWatctlistData(transformedData as WatchlistItem[]);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [user?.uid, getWatchlistData]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 my-5">
      <h2 className="font-semibold uppercase text-[#353535] opacity-80">
        Watchlist Movies
      </h2>

      {!isLoading && watchlistData?.length === 0 && (
        <div className="text-center font-semibold opacity-80 my-5">
          Watchlist is empty
        </div>
      )}

      {!isLoading && watchlistData?.length > 0 && (
        <div className="grid grid-cols-1 gap-4 align-middle my-8 ml-7">
          {watchlistData?.map((data) => (
            <WatchlistCard key={data.id} item={data} type={data.media_type} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
