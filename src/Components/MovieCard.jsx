import React from "react";
import Card, { CardTitle, CardContent } from "./Card";
import extractYear from "./helpers/extractYear";

import "./Card.scss";

const MovieCard = ({ data }) => {
  return (
    <Card key={data.id} data={data} image={data.poster_path} type={"movies"}>
      <CardTitle>{data.title}</CardTitle>
      <CardContent>
        <div
          className={`${data.vote_average > 5.5 ? "good-movie" : "bad-movie"}`}
        >
          {data.vote_average}
        </div>
        <div className="card-details-release-date">
          {extractYear(data.release_date)}
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
