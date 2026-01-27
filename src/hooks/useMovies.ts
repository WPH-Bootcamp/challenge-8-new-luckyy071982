import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import type { MovieResponse } from "../types/movie";

export const useTrendingMovies = () => {
  return useQuery({
    queryKey: ["movies", "trending"],
    queryFn: async () => {
      const { data } = await api.get<MovieResponse>("/trending/movie/day");
      return data;
    },
  });
};

export const useNowPlayingMovies = () => {
  return useQuery({
    queryKey: ["movies", "now-playing"],
    queryFn: async () => {
      const { data } = await api.get<MovieResponse>("/movie/now_playing");
      return data;
    },
  });
};

export const useMovieDetail = (id: string) => {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const { data } = await api.get(
        `/movie/${id}?append_to_response=videos,credits`
      );
      return data;
    },
    enabled: !!id,
  });
};

export const useSearchMovies = (query: string) => {
  return useQuery({
    queryKey: ["movies", "search", query],
    queryFn: async () => {
      if (!query) return { results: [] };

      const { data: searchData } = await api.get<MovieResponse>(
        "/search/movie",
        {
          params: {
            query,
            language: "en-US",
            page: 1,
          },
        }
      );

      const detailedResults = await Promise.all(
        searchData.results.map(async (movie: any) => {
          try {
            const { data: detail } = await api.get(`/movie/${movie.id}`, {
              params: { append_to_response: "videos" },
            });
            return detail;
          } catch (error) {
            return movie;
          }
        })
      );

      return { ...searchData, results: detailedResults };
    },
    enabled: !!query,
  });
};
