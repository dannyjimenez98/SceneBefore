import { Link } from "react-router-dom";
import VoteAvgBadge from "./VoteAvgBadge";

interface MovieCardProps {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    // release_date: string;
    // overview: string;
}

function MovieCard({id, title, poster_path, vote_average}: MovieCardProps) {
  return (
      <>
        {poster_path && (
          <div className="relative border border-secondary hover:border-2 rounded-lg hover:opacity-80 transition bg-secondary">
            <Link to={`/movie/${id}`}  key={id} className="block">
                <img 
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`} 
                    alt={title} 
                    className="rounded-t-lg shadow-lg object-cover"
                />
                <span className="absolute top-2 left-2">

                <VoteAvgBadge voteAverage={vote_average} badgeSize="md" />
                </span>
                <p className="my-1 items-center text-center font-bold text-sm text-base-300">{title}</p>
            </Link>
          </div>
        )}
      </>
  )
}

export default MovieCard;