import { useState } from "react";
import { Link } from "react-router-dom";
import { useNowPlayingMovies } from "../../hooks/useMovies";
import { movieRating, movieTitle, sectionTitle } from "../GlobalClasses";

export const NewReleaseSection = () => {
  const { data, isLoading } = useNowPlayingMovies();
  const [visibleItems, setVisibleItems] = useState(10);

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + 10);
  };

  if (isLoading)
    return (
      <div className="h-96 animate-pulse bg-white/5 rounded-xl mt-12 mx-4 md:mx-20" />
    );

  const movies = data?.results.slice(0, visibleItems) || [];
  const hasMore = data?.results && visibleItems < data.results.length;

  return (
    <section className="pt-6 md:pt-12 pb-0 relative px-4 md:px-20 font-poppins bg-[#0a0a0a]">
      <h2 className={`${sectionTitle}`}>New Release</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10 justify-items-center mb-10">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            className="w-[172px] md:w-[216px] group cursor-pointer block"
          >
            <div className="w-full h-[266px] md:h-[320px] rounded-xl md:rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-red-600 transition-all duration-300 relative">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            <div className="mt-4">
              <h3
                className={`${movieTitle} truncate pr-2 group-hover:text-red-500 transition-colors`}
              >
                {movie.title}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                <img
                  src="/src/assets/icons/Star.svg"
                  alt="star"
                  className="w-3.5 h-3.5 md:w-4 md:h-4"
                />
                <span className={`${movieRating}`}>
                  {movie.vote_average.toFixed(1)}/10
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent flex items-center justify-center z-20 pointer-events-none pt-20">
          <button
            onClick={handleLoadMore}
            className="w-[200px] h-[44px] bg-[#1a1a1a] hover:bg-white/10 text-white border border-white/10 rounded-full font-medium transition-all active:scale-95 backdrop-blur-md cursor-pointer pointer-events-auto shadow-2xl flex items-center justify-center mb-30"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};
