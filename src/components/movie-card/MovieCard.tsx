import React from "react";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import { IMovie } from "models/movie.model";
import "./MovieCard.scss";

interface MovieCardProps {
  category: keyof typeof category;
  item: IMovie;
}

const MovieCard = (props: MovieCardProps) => {
  const item = props.item;
  const link = "/" + category[props.category] + "/" + item.id;
  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
    <Link to={link}>
      <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
        <Button>
          <i className="bx bx-play"></i>
        </Button>
      </div>
      <h3>{item.title}</h3>
    </Link>
  );
};

export default MovieCard;
