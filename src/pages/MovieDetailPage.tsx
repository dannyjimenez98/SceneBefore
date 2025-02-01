import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StreamProvider from "../components/StreamProvider";
import UserRating from "../components/UserRating";
import VoteAvgBadge from "../components/VoteAvgBadge";


interface MovieDetail {
  title: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  overview: string;
  genres: { name: string }[];
  runtime: number;
  vote_average: number;
}

interface StreamingProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

export default function MovieDetailPage() {
  const { id } = useParams(); // Get movie id from URL
  const [movie, setMovie] = useState<MovieDetail | null>(null);

  const [subscriptionServices, setSubscriptionServices] = useState<StreamingProvider[]>([]);
  const [rentServices, setRentServices] = useState<StreamingProvider[]>([]);
  const [buyServices, setBuyServices] = useState<StreamingProvider[]>([]);

  const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
  const movieDetailUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${tmdbApiKey}&language=en-US`;
  const streamProvidersUrl = `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${tmdbApiKey}`;

  useEffect(() => {
    if (id) {
      axios
        .all([axios.get(movieDetailUrl), axios.get(streamProvidersUrl)])
        .then(
          axios.spread((movieRes, streamRes) => {
            setMovie(movieRes.data);

            // Get US streaming services (flatrate, rent, buy)
            const usProviders = streamRes.data.results?.US;
            setSubscriptionServices(usProviders?.flatrate || []);
            setRentServices(usProviders?.rent || []);
            setBuyServices(usProviders?.buy || []);
          })
        )
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [id]);

  if (!movie) return <p>Loading movie details...</p>;

  return (
    <>
  {/* Backdrop Container */}
  <div
    className="relative w-full min-w-full max-h-[500px]"
    style={{ height: "calc(100vw / 2.222222)" }}
  >
    <div
      className="text-white px-4 h-full bg-no-repeat bg-cover flex justify-start items-end"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(27, 22, 24, 1) 5%, rgba(0, 0, 0, 0.6) 50%), url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
      }}
    >
      {/* Movie Poster */}
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="absolute bottom-[-50px] w-[30vw] max-w-[300px] sm:w-[25vw] xs:w-[40vw] rounded-lg border-primary border-2 shadow-lg"
      />
    </div>
  </div>

  {/* Movie Info (Below Poster) */}
  <div className="mt-[60px] px-4">
    <div className="flex items-center">
        <h1 className="text-3xl font-bold mr-2">{movie.title}</h1>
        <p className="text-2xl text-gray-400 mr-3"> {`(${movie.release_date.split('-')[0]})`}</p>
        <VoteAvgBadge voteAverage={movie.vote_average} badgeSize="lg" />
    </div>
        
    <p className="mt-2">{movie.release_date} | {movie.genres.map((genre) => genre.name).join(", ")} | {movie.runtime} minutes </p>
    
    <UserRating />

    <h2 className="color-primary">Overview</h2>
    <p className="mt-2">{movie.overview}</p>

    {/* Streaming Services */}
    <h2>Where to Watch (US)</h2>
    <StreamProvider
      title="Included with Subscription"
      providers={subscriptionServices}
    />
    <StreamProvider title="Available to Rent" providers={rentServices} />
    <StreamProvider title="Available to Buy" providers={buyServices} />
    <br />
    <small>
      <i>Streaming availability courtesy of JustWatch</i>
    </small>
  </div>

    </>


  );
}
