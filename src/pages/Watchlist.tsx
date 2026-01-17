import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";
import WatchlistCard from "../components/WatchlistCard";
import { useAuth } from "../context/useAuth";
import { useFirestore } from "../services/firestore";
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
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <div>
          <h1 className="text-foreground text-2xl font-bold md:text-3xl">
            My Watchlist
          </h1>
          <p className="text-muted-foreground text-sm">
            {watchlistData?.length > 0
              ? `${watchlistData.length} titles saved`
              : "Your saved movies and shows"}
          </p>
        </div>
      </div>

      {!isLoading && watchlistData?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-primary/10 mb-6 flex h-24 w-24 items-center justify-center rounded-full">
            <Bookmark className="text-primary/50 h-12 w-12" />
          </div>
          <h3 className="text-foreground mb-3 text-xl font-semibold">
            Your watchlist is empty
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            Start adding movies and TV shows to your watchlist to keep track of
            what you want to watch.
          </p>
          <Button asChild className="gradient-bg rounded-full hover:opacity-90">
            <Link to="/movies">Discover Movies</Link>
          </Button>
        </div>
      )}

      {!isLoading && watchlistData?.length > 0 && (
        <div className="flex flex-col gap-4">
          {watchlistData?.map((data) => (
            <WatchlistCard key={data.id} item={data} type={data.media_type} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
