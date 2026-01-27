export interface Movie {
  id: number;
  title: string;
  name?: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  release_date?: string;
  first_air_date?: string;
}

export interface MovieResponse {
  results: Movie[];
  page: number;
  total_pages: number;
}
