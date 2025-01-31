import MovieCard from "./MovieCard";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    overview: string;
    // vote_average: number;
}

interface MoviesListProps {
    movies: Movie[];
}

function MoviesList({movies}: MoviesListProps) {
  return (
    <div className="container mx-auto max-w-screen-lg">
        <div className="flex flex-wrap lg:justify-between md:justify-evenly gap-5">
            {movies.map((movie) => (
                <MovieCard
                    id={movie.id}
                    title={movie.title}
                    poster_path={movie.poster_path}
                    release_date={movie.release_date}
                    overview={movie.overview}
                />
            ))}
        </div>
    </div>
  )
}
export default MoviesList;