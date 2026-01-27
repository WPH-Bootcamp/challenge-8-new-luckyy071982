import { useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { Heart, X, AlertCircle } from "lucide-react";
import playIcon from "../assets/icons/Play.svg";
import clapperboardIcon from "../assets/icons/Clapperboard.svg";

export const FavoritesPage = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const [showToast, setShowToast] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [selectedTrailerKey, setSelectedTrailerKey] = useState<string | null>(
    null
  );

  const handleUnfavorite = (movie: any) => {
    toggleFavorite(movie);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1000);
  };

  const handleWatchTrailer = (movie: any) => {
    const trailer = movie?.videos?.results?.find(
      (v: any) => v.type === "Trailer" && v.site === "YouTube"
    );
    if (trailer) {
      setSelectedTrailerKey(trailer.key);
      setShowTrailer(true);
    }
  };

  return (
    <div className="min-h-[70vh] bg-[#0a0a0a] text-white font-poppins pt-28 md:pt-36 pb-10 px-4 md:px-20 lg:px-32 max-w-7xl mx-auto">
      {showTrailer && selectedTrailerKey && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={() => setShowTrailer(false)}
          />
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 z-10 bg-white/10 p-2 rounded-full transition-all"
            >
              <X size={24} />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${selectedTrailerKey}?autoplay=1`}
              title="Trailer"
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <AlertCircle className="text-red-400" size={20} />
          <span className="text-sm font-medium">Removed from Favorites</span>
        </div>
      )}

      <h1 className="text-2xl md:text-4xl font-bold mb-8 md:mb-10 text-left">
        Favorites
      </h1>

      {favorites && favorites.length > 0 ? (
        <div className="flex flex-col gap-6 md:gap-8">
          {favorites.map((movie: any) => (
            <div
              key={movie.id}
              className="flex flex-row gap-4 md:gap-6 border-b border-white/5 pb-6 md:pb-8 last:border-0 group"
            >
              <Link
                to={`/movie/${movie.id}`}
                className="w-[100px] md:w-52 h-[150px] md:h-72 rounded-xl md:rounded-2xl overflow-hidden shrink-0 shadow-lg"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={movie.title}
                />
              </Link>

              <div className="flex flex-1 flex-col justify-start">
                <div className="flex justify-between items-start mb-1 md:mb-2">
                  <Link to={`/movie/${movie.id}`} className="flex-1 pr-2">
                    <h2 className="text-base md:text-2xl font-bold line-clamp-2 hover:text-red-600 transition-colors uppercase md:normal-case leading-tight">
                      {movie.title}
                    </h2>
                  </Link>
                  <button
                    onClick={() => handleUnfavorite(movie)}
                    className="w-8 h-8 md:w-12 md:h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-red-600 group/heart transition-all shrink-0 cursor-pointer"
                  >
                    <Heart className="w-4 h-4 md:w-5 md:h-5 fill-red-600 text-red-600 group-hover/heart:fill-white group-hover/heart:text-white" />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-2 md:mb-4">
                  <span className="text-yellow-500 text-xs md:text-base font-semibold">
                    ⭐ {movie.vote_average?.toFixed(1)}/10
                  </span>
                </div>

                <p className="text-gray-400 text-sm md:text-base leading-snug md:leading-relaxed line-clamp-2 md:line-clamp-3 mb-4 md:mb-6">
                  {movie.overview}
                </p>

                <button
                  onClick={() => handleWatchTrailer(movie)}
                  className="w-fit bg-[#B91C1C] hover:bg-red-700 text-white px-4 md:px-8 h-8 md:h-12 rounded-full flex items-center justify-center gap-2 md:gap-3 transition-all text-[10px] md:text-sm font-semibold active:scale-95 shadow-lg cursor-pointer"
                >
                  Watch Trailer
                  <img
                    src={playIcon}
                    alt="Play"
                    className="w-3 h-3 md:w-5 md:h-5"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <img
            src={clapperboardIcon}
            className="w-24 h-24 md:w-44 md:h-44 mb-6 opacity-20"
            alt="Empty"
          />
          <h2 className="text-xl md:text-2xl font-bold mb-2">Data Empty</h2>
          <p className="text-gray-500 text-sm mb-8">
            You don't have a favorite movie yet
          </p>
          <Link
            to="/"
            className="bg-[#B91C1C] hover:bg-red-700 text-white px-10 py-3 rounded-full font-bold transition-all shadow-lg"
          >
            Explore Movie
          </Link>
        </div>
      )}
    </div>
  );
};
