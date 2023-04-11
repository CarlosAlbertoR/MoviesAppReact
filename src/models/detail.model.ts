export interface IDetail {
  id: number;
  title: string;
  overview: string;
  genres: Array<{ id: number; name: string }>;
  poster_path: string;
  backdrop_path: string;
}
