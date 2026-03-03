import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Search, X, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useSearchMovies } from "../../hooks/useMovies";
import { useFavorites } from "../../hooks/useFavorites";
import playIcon from "../../assets/icons/Play.svg";

export const SearchMenu = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchTerm), 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data, isLoading } = useSearchMovies(debouncedQuery);
  const results = data?.results || [];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 300);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 bg-[#0a0a0a] z-[100] transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } font-poppins text-white`}
    >
      <div className="flex flex-col h-full max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8 shrink-0">
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Movie"
              className="w-full bg-[#0d1117] border border-white/10 rounded-xl py-3 pl-12 pr-12 outline-none focus:border-red-600 transition-all"
            />
            {searchTerm && (
              <X
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setSearchTerm("")}
                size={18}
              />
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {isLoading ? (
            <div className="flex justify-center pt-10">
              <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 gap-8">
              {results.map((movie: any) => (
                <div key={movie.id} className="flex gap-5 group">
                  {/* Poster */}
                  <Link
                    to={`/movie/${movie.id}`}
                    onClick={onClose}
                    className="w-28 h-40 md:w-32 md:h-48 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-lg"
                  >
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : "https://via.placeholder.com/500x750?text=No+Poster"
                      }
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={movie.title}
                    />
                  </Link>

                  <div className="flex-1 flex flex-col justify-center">
                    <Link to={`/movie/${movie.id}`} onClick={onClose}>
                      <h3 className="font-bold text-xl group-hover:text-red-500 transition-colors line-clamp-1">
                        {movie.title}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-1.5 text-yellow-500 my-1.5">
                      <span className="font-bold text-sm">
                        ⭐ {movie.vote_average?.toFixed(1) || "0.0"}
                      </span>
                      <span className="text-gray-500 text-xs">/ 10</span>
                    </div>

                    <p className="text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed max-w-2xl">
                      {movie.overview || "No description available."}
                    </p>

                    <div className="flex items-center gap-4">
                      <Link
                        to={`/movie/${movie.id}`}
                        onClick={onClose}
                        className="bg-[#B91C1C] hover:bg-red-800 px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg"
                      >
                        Watch Trailer
                        <img
                          src={playIcon}
                          alt="Play"
                          className="w-3.5 h-3.5"
                        />
                      </Link>

                      <button
                        onClick={() => toggleFavorite(movie)}
                        className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all ${
                          isFavorite(movie.id)
                            ? "bg-[#0d1117] border-red-600/50"
                            : "bg-[#0d1117] border-white/10 hover:border-red-600/50"
                        }`}
                      >
                        <Heart
                          size={20}
                          className={`transition-colors ${
                            isFavorite(movie.id)
                              ? "text-red-600 fill-red-600"
                              : "text-gray-500"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            debouncedQuery && (
              <div className="flex flex-col items-center justify-center h-full pb-20">
                <img
                  src="/src/assets/icons/ClapperboardSearch.svg"
                  className="w-56 mb-6 opacity-60"
                  alt="Not Found"
                />
                <h2 className="text-2xl font-bold">Data Not Found</h2>
                <p className="text-gray-500">Try other keywords</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
