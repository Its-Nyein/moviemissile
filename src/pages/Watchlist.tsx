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
      <div className="flex items-center gap-3 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
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
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Bookmark className="h-12 w-12 text-primary/50" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-3">
            Your watchlist is empty
          </h3>
          <p className="text-muted-foreground max-w-md mb-6">
            Start adding movies and TV shows to your watchlist to keep track of
            what you want to watch.
          </p>
          <Button asChild className="rounded-full gradient-bg hover:opacity-90">
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
