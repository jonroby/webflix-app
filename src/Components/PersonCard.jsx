import React from "react";
import Card, { CardTitle, CardContent } from "./Card";
import extractYear from "./helpers/extractYear";

import "./Card.scss";

const PersonCard = ({ data }) => {
  return (
    <Card key={data.id} data={data} image={data.profile_path} type={"persons"}>
      <CardTitle>{data.name}</CardTitle>
      <CardContent>
        <div className={`${data.popularity > 50 ? "good-movie" : "bad-movie"}`}>
          {data.popularity}
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonCard;
