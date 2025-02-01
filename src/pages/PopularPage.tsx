import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import axios from 'axios';


interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  vote_average: number;
}

export default function PopularPage() {
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
          `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}&language=en-US&page=${currentPage}`
        );

        setMovies((prevMovies) => currentPage === 1 ? [...response.data.results] : [...prevMovies, ...response.data.results]); // Append new movies
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage]); // Fetch movies when `currentPage` changes

  return (
    <div className="container mx-auto px-5">
      <h1 className="text-2xl font-bold my-4">Popular Movies</h1>

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
            {loading ? <span className="loading loading-spinner text-primary"></span> : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
