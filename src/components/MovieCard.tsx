import { Link } from "react-router-dom";

interface MovieCardProps {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    overview: string;
}

function MovieCard({id, title, poster_path, release_date, overview}: MovieCardProps) {
  return (
      <div className="relative w-[300px] h-[450px] group">
        {poster_path && (
          <>
            <Link to={`/movie/${id}`} className="w-full h-full">
                {/* Movie Poster */}
                <img
                className="w-full h-full rounded-lg object-cover border border-primary"
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={`${title} Poster`}
                />
    
                {/* Hover Overlay with Movie Info */}
                <div className="absolute inset-0 bg-black/80 text-white flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg border-4 border-primary">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-md mt-1">{release_date?.split('-')[0]}</p>
                <p className="text-sm mt-1 line-clamp-5">{overview}</p>
                </div>
            </Link>
          </>
        )}
      </div>
  )
}

export default MovieCard;