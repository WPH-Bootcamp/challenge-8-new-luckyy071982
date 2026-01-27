import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTrendingMovies } from "../../hooks/useMovies";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { movieRating, movieTitle, sectionTitle } from "../GlobalClasses";

export const TrendingSection = () => {
  const { data, isLoading } = useTrendingMovies();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const checkScrollPos = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setIsAtStart(scrollLeft <= 10);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollPos();
    window.addEventListener("resize", checkScrollPos);
    return () => window.removeEventListener("resize", checkScrollPos);
  }, [data]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount =
        direction === "left" ? -clientWidth / 1.5 : clientWidth / 1.5;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (isLoading)
    return (
      <div className="h-64 animate-pulse bg-white/5 rounded-xl mt-12 mx-4 md:mx-20" />
    );

  return (
    <section className="pt-6 md:pt-8 px-4 md:px-20 group sm:mt-5 font-poppins">
      <h2 className={`${sectionTitle}`}>Trending Now</h2>

      <div className="relative">
        {!isAtStart && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-2 md:-left-6 top-[133px] md:top-[160px] -translate-y-1/2 z-40 bg-black/60 backdrop-blur-sm p-2 rounded-full text-white shadow-lg border border-white/10 transition-all duration-300 ease-in-out hover:bg-red-600 hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center"
          >
            <ChevronLeft size={24} className="md:w-8 md:h-8" />
          </button>
        )}

        <div className="absolute inset-y-0 right-0 w-16 bg-linear-to-l from-[#0a0a0a] to-transparent z-30 pointer-events-none hidden md:block h-[320px]" />

        {!isAtEnd && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-2 md:-right-6 top-[133px] md:top-[160px] -translate-y-1/2 z-40 bg-black/60 backdrop-blur-sm p-2 rounded-full text-white shadow-lg border border-white/10 transition-all duration-300 ease-in-out hover:bg-red-600 hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center"
          >
            <ChevronRight size={24} className="md:w-8 md:h-8" />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={checkScrollPos}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x px-1"
        >
          {data?.results.map((movie, index) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="min-w-[172px] md:min-w-[216px] relative snap-start group/card cursor-pointer block"
            >
              <div className="relative">
                <div className="absolute top-2 left-2 z-20 bg-black/70 backdrop-blur-md w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center border border-white/20">
                  <span className="text-white font-bold text-xs md:text-base">
                    {index + 1}
                  </span>
                </div>

                <div className="w-full h-[266px] md:h-[320px] rounded-xl md:rounded-2xl overflow-hidden border-2 border-transparent group-hover/card:border-red-600 transition-all duration-300">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="mt-4">
                <h3
                  className={`${movieTitle} truncate pr-2 text-white font-medium group-hover/card:text-red-500 transition-colors`}
                >
                  {movie.title}
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <img
                    src="/src/assets/icons/Star.svg"
                    alt="star"
                    className="w-3 h-3 md:w-4 md:h-4"
                  />
                  <span className={`${movieRating}`}>
                    {movie.vote_average.toFixed(1)}/10
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
