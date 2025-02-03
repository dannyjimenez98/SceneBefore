import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);

  const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    if (query.length > 0) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?include_adult=true&language=en-US&page=1&api_key=${tmdbApiKey}&query=${query}`
        )
        .then((res) => setMovies(res.data.results.slice(0, 5))) // Limit to top 5 results
        .catch((err) => console.error(err));
    } else {
      setMovies([]); // Clear results if query is empty
    }
  }, [query]);

  return (
    <div className="relative flex items-center">
      {/* Search Container */}
      <motion.div
        className="flex items-center rounded-full overflow-hidden bg-transparent shadow-md"
        animate={{ width: isOpen ? "250px" : "34px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Search Icon Button */}
        <button
          className="p-2 rounded-full flex items-center justify-center hover:bg-base-200"
          onClick={() => {
            setIsOpen(!isOpen);
            setQuery(""); // Clear input when closing
            setMovies([]);
          }}
        >
          {isOpen ? (
            <FontAwesomeIcon className="text-primary" icon={faXmark} />
          ) : (
            <FontAwesomeIcon
              className="text-primary"
              icon={faMagnifyingGlass}
            />
          )}
        </button>

        {/* Search Input */}
        {isOpen && (
          <motion.input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-none px-3 py-1 w-full text-md rounded-full bg-base-100 focus:outline-primary"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            exit={{ opacity: 0, width: 0 }}
          />
        )}
      </motion.div>

      {/* Dropdown Results */}
      {isOpen && query && (
        <motion.div
          className="absolute top-12 left-0 w-[250px] bg-base-100 shadow-lg rounded-lg p-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <div key={movie.id}>
                <Link
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  className="flex items-center gap-2 p-2 hover:bg-base-300 rounded transition"
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                    setMovies([]);
                  }}
                >
                  {movie.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w45${movie.poster_path}`}
                      alt={movie.title}
                      className="w-10 h-14 rounded"
                    />
                  )}
                  <p>
                    <span className="text-sm font-medium">{movie.title}</span>
                    <p className="text-xs text-gray-400">
                      {" "}
                      {movie.release_date.split("-")[0]}
                    </p>
                  </p>
                </Link>
                {/* divider between movies */}
                {index < movies.length - 1 && (
                  <hr className="border-t border-primary my-2" />
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-2">No matches found</p>
          )}
        </motion.div>
      )}
    </div>
  );
}
