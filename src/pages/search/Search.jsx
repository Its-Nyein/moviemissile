import { useEffect, useRef, useState } from "react";
import { fetchSearchMovies } from "../../services/fetcher";
import LoadingSpinner from "../../UI/LoadingSpinner";
import MovieCard from "../../components/MovieCard";
import Pagination from "../../UI/Pagination";

const Search = () => {
  const [searchMovies, setSearchMovies] = useState("");
  const [tempSearchMoviesVal, setTempSearchMoviesVal] = useState("");
  const [searchMoviesData, setSearchMoviesData] = useState([]);
  const [pages, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchMovies.trim() === "") {
      return;
    }

    setLoading(true);
    fetchSearchMovies(searchMovies, pages)
      .then((res) => setSearchMoviesData(res?.results))
      .then((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [searchMovies, pages]);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (tempSearchMoviesVal.trim() !== "") {
      setSearchMovies(tempSearchMoviesVal.trim());
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 my-5">
      <h2 className="font-semibold uppercase text-[#353535] opacity-80">
        Search
      </h2>

      <form className="my-5" onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder="Search movies, tv shows"
          value={tempSearchMoviesVal}
          ref={searchInputRef}
          className="w-full  border border-[#01b4e4] p-3 rounded focus:outline-none shadow bg-transparent placeholder:text-gray-400"
          onChange={(e) => setTempSearchMoviesVal(e.target.value)}
        />
      </form>

      {searchMoviesData?.length === 0 && !loading && searchMovies && (
        <div className="container mx-auto max-w-7xl px-4 my-5">
          <p className="text-center mt-4 text-gray-500">No movies found.</p>
        </div>
      )}

      {searchMoviesData?.length > 0 && !loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4 align-middle my-8">
          {searchMoviesData?.map((data) => (
            <MovieCard key={data.id} item={data} type={data?.media_type} />
          ))}
        </div>
      )}

      {searchMoviesData?.length > 0 && !loading && (
        <Pagination
          onPageChange={setPages}
          totalCount={totalPages}
          currentPage={pages}
          pageSize={20}
        />
      )}
    </div>
  );
};

export default Search;
