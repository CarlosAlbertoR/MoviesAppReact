import { IMovie } from "./movie.model";

export interface IMovieListResponse {
  results: Array<IMovie>;
  page: number;
  total_results: number;
  total_pages: number;
}
