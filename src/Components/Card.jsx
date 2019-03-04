import React from "react";
import { Link } from "react-router-dom";
import "./Card.scss";

const CardImage = ({ image }) => (
  <div className="card-image-container">
    <img
      src={image && `https://image.tmdb.org/t/p/w500_and_h282_face/${image}`}
    />
  </div>
);

const CardTitle = props => (
  <div className="card-details-title">{props.children}</div>
);

const CardContent = props => (
  <div className="card-details-data">{props.children}</div>
);

const Card = props => {
  return (
    <Link to={`/movies/${props.data.id}`}>
      <div className="card">
        <CardImage image={props.image} />
        <div className="card-details">{props.children}</div>
      </div>
    </Link>
  );
};

export default Card;
export { CardTitle, CardContent };
