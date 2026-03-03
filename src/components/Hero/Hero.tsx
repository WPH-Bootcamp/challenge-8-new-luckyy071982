import { useState } from "react";
import { Link } from "react-router-dom";
import { useTrendingMovies, useMovieDetail } from "../../hooks/useMovies";
import playIcon from "../../assets/icons/Play.svg";
import { X } from "lucide-react";

export const Hero = () => {
  const { data: trendingData, isLoading: isTrendingLoading } =
    useTrendingMovies();
  const [showTrailer, setShowTrailer] = useState(false);

  const firstMovieId = trendingData?.results[0]?.id;

  const { data: movie, isLoading: isDetailLoading } = useMovieDetail(
    firstMovieId?.toString() || ""
  );

  if (isTrendingLoading || isDetailLoading) {
    return (
      <div className="h-[80vh] w-full bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-48 h-8 bg-gray-800 rounded"></div>
          <div className="w-96 h-4 bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }

  if (!movie) return null;

  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  const trailer = movie?.videos?.results?.find(
    (v: any) => v.type === "Trailer" && v.site === "YouTube"
  );

  return (
    <section className="relative h-[80vh] md:h-[95vh] w-full overflow-hidden">
      {showTrailer && trailer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={() => setShowTrailer(false)}
          />
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all cursor-pointer text-white"
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

      <div className="absolute inset-0">
        <img
          src={backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover object-top"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/1920x1080?text=No+Image";
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/90 via-transparent to-transparent" />
      </div>

      <div className="pb-16 md:px-16 lg:px-24 xl:px-32 relative h-full flex flex-col justify-end px-8 max-w-7xl mx-auto z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight max-w-2xl font-poppins">
          {movie.title}
        </h1>
        <p className="text-sm md:text-lg text-[#FDFDFD]/80 mb-8 max-w-xl line-clamp-3 font-poppins font-normal">
          {movie.overview}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => trailer && setShowTrailer(true)}
            className={`bg-[#B91C1C] hover:bg-red-700 text-white px-8 py-3 rounded-full flex items-center justify-center gap-3 transition-all text-[14px] md:text-[16px] font-semibold cursor-pointer ${
              !trailer && "opacity-50 cursor-not-allowed"
            }`}
            disabled={!trailer}
          >
            {trailer ? "Watch Trailer" : "No Trailer Available"}
            <img src={playIcon} alt="Play" className="w-5 h-5" />
          </button>

          <Link
            to={`/movie/${movie.id}`}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-10 py-3 rounded-full transition-all text-[14px] md:text-[16px] font-semibold text-center flex items-center justify-center"
          >
            See Detail
          </Link>
        </div>
      </div>
    </section>
  );
};
