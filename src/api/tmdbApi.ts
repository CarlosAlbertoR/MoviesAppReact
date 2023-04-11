import { IMovieListResponse } from "models/movie-list-response.model";
import axiosClient from "./axiosClient";
import { IVideoList } from "models/videos-list-response.model";
import { IDetail } from "models/detail.model";

interface Params {
  [key: string]: any;
}

export const category = {
  movie: "movie" as "movie",
  tv: "tv" as "tv",
};

export const movieType = {
  upcoming: "upcoming" as "upcoming",
  popular: "popular" as "popular",
  top_rated: "top_rated" as "top_rated",
};

export const tvType = {
  popular: "popular" as "popular",
  top_rated: "top_rated" as "top_rated",
  on_the_air: "on_the_air" as "on_the_air",
};

const tmdbApi = {
  getMoviesList: (
    type: keyof (typeof movieType & typeof tvType) | "similar",
    params: Params
  ) => {
    const url = "movie/" + type;
    return axiosClient.get<IMovieListResponse>(url, params);
  },

  getTvList: (
    type: keyof (typeof movieType & typeof tvType) | "similar",
    params: Params
  ) => {
    const url = "tv/" + type;
    return axiosClient.get(url, params);
  },

  getVideos: (cate: keyof typeof category, id: number) => {
    const url = category[cate] + "/" + id + "/videos";
    return axiosClient.get<IVideoList>(url, { params: {} });
  },

  search: (cate: keyof typeof category, params: Params) => {
    const url = "search/" + category[cate];
    return axiosClient.get(url, params);
  },

  detail: (cate: keyof typeof category, id: number, params: Params) => {
    const url = category[cate] + "/" + id;
    return axiosClient.get<IDetail>(url, params);
  },

  credits: (cate: keyof typeof category, id: number) => {
    const url = category[cate] + "/" + id + "/credits";
    return axiosClient.get(url, { params: {} });
  },

  similar: (cate: keyof typeof category, id: number) => {
    const url = category[cate] + "/" + id + "/similar";
    return axiosClient.get(url, { params: {} });
  },
};

export default tmdbApi;
