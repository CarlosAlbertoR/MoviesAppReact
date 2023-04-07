import { Movie } from "./movie.model";

export interface MovieListResponse {
  results: Movie[];
  page: number;
  total_results: number;
  total_pages: number;
}
