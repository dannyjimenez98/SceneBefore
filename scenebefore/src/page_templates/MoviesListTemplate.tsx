import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

interface MoviesListTemplateProps {
  movieListType: string; // e.g. popular, now_playing, etc. as per TMDB API docs
  pageTitle: string;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  vote_average: number;
}

export default function MoviesListTemplate({
  movieListType,
  pageTitle,
}: MoviesListTemplateProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); // Track loading state

  const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieListType}?api_key=${tmdbApiKey}&language=en-US&page=${currentPage}`
        );

        setMovies((prevMovies) =>
          currentPage === 1
            ? [...response.data.results]
            : [...prevMovies, ...response.data.results]
        ); // Append new movies
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage]);

  return (
    <div className="container mx-auto px-5">
      <h1 className="text-2xl font-bold my-4">{pageTitle}</h1>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            vote_average={movie.vote_average}
          />
        ))}
      </div>

      {/* Load More Button */}
      {currentPage < totalPages && (
        <div className="flex justify-center my-6">
          <button
            className="btn btn-primary"
            disabled={loading}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            {loading ? (
              <span className="loading loading-spinner text-primary"></span>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
