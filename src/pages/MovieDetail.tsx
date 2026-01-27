import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieDetail } from "../hooks/useMovies";
import { useFavorites } from "../hooks/useFavorites";
import playIcon from "../assets/icons/Play.svg";
import { Heart, CheckCircle2, X, AlertCircle } from "lucide-react";

export const MovieDetail = () => {
  const { id } = useParams();
  const { data: movie, isLoading } = useMovieDetail(id!);
  const { toggleFavorite, isFavorite } = useFavorites();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  if (isLoading) return <div className="min-h-screen bg-[#0a0a0a]" />;
  if (!movie) return null;

  const trailer = movie?.videos?.results?.find(
    (v: any) => v.type === "Trailer" && v.site === "YouTube"
  );

  const currentlyFavorite = isFavorite(movie.id);

  const handleFavoriteClick = () => {
    const wasFavorite = currentlyFavorite;
    toggleFavorite(movie);

    if (!wasFavorite) {
      setToastMessage("Success Add to Favorites");
    } else {
      setToastMessage("Removed from Favorites");
    }

    setShowToast(true);
    setTimeout(() => setShowToast(false), 1000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-poppins relative">
      {showTrailer && trailer && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={() => setShowTrailer(false)}
          />
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all cursor-pointer"
            >
              <X size={24} />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title="YouTube video player"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          {currentlyFavorite ? (
            <CheckCircle2 className="text-green-400" size={20} />
          ) : (
            <AlertCircle className="text-red-400" size={20} />
          )}
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      <div className="relative h-[50vh] md:h-[70vh] w-full">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          className="w-full h-full object-cover object-top"
          alt={movie.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-transparent" />
      </div>

      <div className="relative -mt-32 md:-mt-64 px-8 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto pb-20 z-10">
        <div className="flex flex-col md:flex-row gap-10 mb-12 items-start">
          <div className="w-64 h-[380px] rounded-2xl overflow-hidden border-4 border-white/10 shrink-0 hidden md:block shadow-2xl">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              className="w-full h-full object-cover"
              alt={movie.title}
            />
          </div>

          <div className="flex-1 pt-4 md:pt-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {movie.title}
            </h1>

            <div className="flex items-center gap-2 text-[#A4A7AE] mb-8 font-normal">
              <img
                src="/src/assets/icons/Calendar.svg"
                className="w-5 h-5"
                alt="calendar"
              />
              <span>
                {new Date(movie.release_date).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-10">
              {trailer ? (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="bg-[#B91C1C] hover:bg-red-700 text-white px-8 h-12 rounded-full flex items-center gap-3 transition-all font-semibold shadow-lg active:scale-95 cursor-pointer"
                >
                  Watch Trailer
                  <img src={playIcon} alt="Play" className="w-5 h-5" />
                </button>
              ) : (
                <div className="text-sm text-gray-500 italic">
                  No Trailer Available
                </div>
              )}

              <button
                onClick={handleFavoriteClick}
                className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all active:scale-90 cursor-pointer ${
                  currentlyFavorite
                    ? "bg-[#0F172A] border-white/10 shadow-lg"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <Heart
                  className={`w-6 h-6 transition-colors ${
                    currentlyFavorite
                      ? "fill-red-600 text-red-600"
                      : "text-white"
                  }`}
                />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <StatCard
                label="Rating"
                value={`${movie.vote_average.toFixed(1)}/10`}
                icon="Star"
              />
              <StatCard
                label="Genre"
                value={movie.genres[0]?.name || "N/A"}
                icon="Video"
              />
              <StatCard
                label="Age Limit"
                value={movie.adult ? "18+" : "13"}
                icon="Face"
              />
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-[#A4A7AE] leading-relaxed max-w-4xl text-sm md:text-base">
              {movie.overview}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-8">Cast & Crew</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {movie.credits.cast.slice(0, 8).map((person: any) => (
                <div key={person.id} className="flex items-center gap-4">
                  <img
                    src={
                      person.profile_path
                        ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                        : "/placeholder-user.png"
                    }
                    className="w-14 h-14 rounded-xl object-cover shadow-md"
                    alt={person.name}
                  />
                  <div>
                    <p className="font-semibold text-sm md:text-base leading-tight">
                      {person.name}
                    </p>
                    <p className="text-xs md:text-sm text-[#A4A7AE] mt-1">
                      {person.character}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon }: any) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 flex flex-col items-center gap-2 backdrop-blur-sm">
    <img
      src={`/src/assets/icons/${icon}.svg`}
      className="w-6 h-6 opacity-60"
      alt=""
    />
    <p className="text-[10px] md:text-xs text-[#A4A7AE] uppercase tracking-widest font-medium">
      {label}
    </p>
    <p className="font-bold text-sm md:text-lg">{value}</p>
  </div>
);
