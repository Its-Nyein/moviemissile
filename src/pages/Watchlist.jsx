import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useFirestore } from "../services/firestore";
import LoadingSpinner from "../UI/LoadingSpinner";
import WatchlistCard from "../components/WatchlistCard";

const Watchlist = () => {
  const { user } = useAuth();
  const { getWatchlistData } = useFirestore();

  const [watchlistData, setWatctlistData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getWatchlistData(user?.uid)
      .then((res) => setWatctlistData(res))
      .then((error) => console.log(error))
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
            <WatchlistCard key={data.id} item={data} type={data?.type} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
