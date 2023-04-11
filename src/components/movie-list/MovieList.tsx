import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import PropTypes from "prop-types";
import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";
import MovieCard from "../movie-card/MovieCard";
import { Movie } from "models/movie.model";
import "./MovieList.scss";

interface MovieListProps {
  category: keyof typeof category;
  id: number;
  type: keyof (typeof movieType & typeof tvType) | "similar";
}

SwiperCore.use([Navigation]);

const MovieList = (props: MovieListProps) => {
  const [items, setItems] = useState<Array<Movie>>([]);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};

      if (props.type !== "similar") {
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(props.type, { params });
            break;
          default:
            response = await tmdbApi.getTvList(props.type, { params });
        }
      } else {
        response = await tmdbApi.similar(props.category, props.id);
      }
      setItems((response as any).results);
    };
    getList();
  }, [props.category, props.id, props.type]);

  return (
    <div className="movie-list">
      <Swiper
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={"auto"}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
      >
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <MovieCard item={item} category={props.category} />
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MovieList;
