import { IVideo } from "./video.model";

export interface IVideoList {
  id: number;
  results: Array<IVideo>;
}
