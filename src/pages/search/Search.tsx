import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../../UI/LoadingSpinner";
import Pagination from "../../UI/Pagination";
import MovieCard from "../../components/MovieCard";
import { fetchSearchMovies } from "../../services/fetcher";
import type { MediaType, Movie } from "../../types";

const Search = () => {
  const [searchMovies, setSearchMovies] = useState("");
  const [tempSearchMoviesVal, setTempSearchMoviesVal] = useState("");
  const [searchMoviesData, setSearchMoviesData] = useState<Movie[]>([]);
  const [pages, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchMovies.trim() === "") {
      return;
    }

    setLoading(true);
    fetchSearchMovies(searchMovies, pages)
      .then((res) => {
        setSearchMoviesData(res?.results || []);
        setTotalPages(res?.total_pages || 1);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [searchMovies, pages]);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tempSearchMoviesVal.trim() !== "") {
      setSearchMovies(tempSearchMoviesVal.trim());
    }
  };

  return (
    <div className="min-h-[80vh] container mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          Search
        </h1>
        <p className="text-muted-foreground">
          Find movies and TV shows
        </p>
      </div>

      {/* Search Bar */}
      <form className="max-w-xl mb-8" onSubmit={handleOnSubmit}>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search movies, TV shows..."
            value={tempSearchMoviesVal}
            ref={searchInputRef}
            className="pl-10 h-11"
            onChange={(e) => setTempSearchMoviesVal(e.target.value)}
          />
        </div>
      </form>

      {loading && <LoadingSpinner />}

      {searchMoviesData?.length === 0 && !loading && searchMovies && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">
            No results found for "{searchMovies}"
          </p>
        </div>
      )}

      {searchMoviesData?.length > 0 && !loading && (
        <>
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Results for <span className="text-foreground font-medium">"{searchMovies}"</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
            {searchMoviesData?.map((data) => (
              <MovieCard
                key={data.id}
                item={data}
                type={data?.media_type as MediaType}
              />
            ))}
          </div>

          <Pagination
            onPageChange={setPages}
            totalCount={totalPages}
            currentPage={pages}
            pageSize={20}
          />
        </>
      )}

      {!searchMovies && !loading && (
        <div className="text-center py-16">
          <SearchIcon className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">
            Start typing to search
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;
