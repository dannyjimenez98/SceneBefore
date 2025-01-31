import { useState, useEffect } from 'react';
import MoviesList from '../components/MoviesList';
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  // vote_average: number;
}

export default function PopularPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const popular = 'https://api.themoviedb.org/3/movie/popular'

  const fetchData = () => {
    axios.get(`${popular}?api_key=${apiKey}`).then((response) => {
      const result = response.data.results;
      console.log(result)
      setMovies(result)
    })
    .catch(() => {
      setError("Failed to fetch movies. Please try again.");
    })
    .finally(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    fetchData();
  }, [])


  if (loading) return <p className="text-center">Loading movies...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">Popular Movies</h1>
      <MoviesList movies={movies} />
    </div>
  )
}
