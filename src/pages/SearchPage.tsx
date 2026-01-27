import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Heart, X } from "lucide-react";
import { useSearchMovies } from "../hooks/useMovies";
import { useFavorites } from "../hooks/useFavorites";
import playIcon from "../assets/icons/Play.svg";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { data, isLoading } = useSearchMovies(query);
  const { isFavorite, toggleFavorite } = useFavorites();

  const [showTrailer, setShowTrailer] = useState(false);
  const [selectedTrailerKey, setSelectedTrailerKey] = useState<string | null>(
    null
  );

  const results = data?.results || [];

  const handleOpenTrailer = (movie: any) => {
    const trailer = movie?.videos?.results?.find(
      (v: any) => v.type === "Trailer" && v.site === "YouTube"
    );
    if (trailer) {
      setSelectedTrailerKey(trailer.key);
      setShowTrailer(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-8 md:px-16 lg:px-24 xl:px-32 text-white font-poppins relative">
      {showTrailer && selectedTrailerKey && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={() => {
              setShowTrailer(false);
              setSelectedTrailerKey(null);
            }}
          />
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <button
              onClick={() => {
                setShowTrailer(false);
                setSelectedTrailerKey(null);
              }}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all cursor-pointer"
            >
              <X size={24} />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${selectedTrailerKey}?autoplay=1`}
              title="YouTube video player"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {!isLoading && results.length > 0 ? (
          <div className="flex flex-col gap-16">
            {results.map((movie: any) => {
              const trailer = movie?.videos?.results?.find(
                (v: any) => v.type === "Trailer" && v.site === "YouTube"
              );

              return (
                <div key={movie.id} className="flex gap-8 items-start group">
                  <Link
                    to={`/movie/${movie.id}`}
                    className="shrink-0 shadow-2xl"
                  >
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : "https://via.placeholder.com/500x750?text=No+Poster"
                      }
                      className="w-32 h-48 md:w-48 md:h-64 rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
                      alt={movie.title}
                    />
                  </Link>

                  <div className="flex-1 pt-2">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <Link to={`/movie/${movie.id}`}>
                          <h2 className="text-2xl md:text-4xl font-bold hover:text-red-500 transition-colors leading-tight">
                            {movie.title}
                          </h2>
                        </Link>

                        <p className="text-yellow-500 font-bold mt-2 flex items-center gap-1 text-lg">
                          ⭐ {movie.vote_average?.toFixed(1) || "0.0"}/10
                        </p>
                      </div>

                      <button
                        onClick={() => toggleFavorite(movie)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 active:scale-90 shrink-0 ${
                          isFavorite(movie.id)
                            ? "bg-[#0d1117] border-red-600/50 shadow-[0_0_15px_rgba(220,38,38,0.2)]"
                            : "bg-[#0d1117] border-white/10 hover:border-red-600/30"
                        }`}
                      >
                        <Heart
                          size={24}
                          className={`transition-all duration-300 ${
                            isFavorite(movie.id)
                              ? "text-red-600 fill-red-600"
                              : "text-gray-500"
                          }`}
                        />
                      </button>
                    </div>

                    <p className="text-[#A4A7AE] text-base max-w-3xl mb-10 line-clamp-3 leading-relaxed">
                      {movie.overview ||
                        "No description available for this movie."}
                    </p>

                    {trailer ? (
                      <button
                        onClick={() => handleOpenTrailer(movie)}
                        className="bg-[#B91C1C] hover:bg-red-700 text-white px-10 py-3.5 rounded-full inline-flex items-center gap-2 font-extrabold transition-all active:scale-95 shadow-lg shadow-red-900/20 cursor-pointer"
                      >
                        Watch Trailer
                        <img src={playIcon} className="w-4 h-4" alt="Play" />
                      </button>
                    ) : (
                      <div className="text-sm text-gray-500 italic">
                        No Trailer Available
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          !isLoading &&
          query && (
            <div className="flex flex-col items-center justify-center py-20">
              <img
                src="/src/assets/icons/ClapperboardSearch.svg"
                className="w-64 mb-10 opacity-50"
                alt="Not Found"
              />
              <h2 className="text-4xl font-bold mb-4">Data Not Found</h2>
              <p className="text-[#717680] text-xl">Try other keywords</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};
