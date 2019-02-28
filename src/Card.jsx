import React from "react";
import { Link } from "react-router-dom";
import extractYear from "./helpers/extractYear";

import "./Card.scss";

const Card = props => {
  return (
    <Link to={`/movies/${props.data.id}`}>
      <div className="card">
        <div className="card-image-container">
          <img
            src={
              props.data.poster_path &&
              `https://image.tmdb.org/t/p/w500_and_h282_face/${
                props.data.poster_path
              }`
            }
          />
        </div>
        <div className="card-details">
          <div className="card-details-title">{props.data.title}</div>
          <div className="card-details-data">
            <div
              className={`${
                props.data.vote_average > 5.5 ? "good-movie" : "bad-movie"
              }`}
            >
              {props.data.vote_average}
            </div>
            <div className="card-details-release-date">
              {extractYear(props.data.release_date)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
