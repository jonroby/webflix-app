import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import qs from "query-string";
import axios from "axios";
import Movies from "./Movies";
import extractYear from "./helpers/extractYear";
import formatFilmDuration from "./helpers/formatFilmDuration";

import "./MovieScreen.scss";

const rootApiUrl = "https:webflix-server.herokuapp.com";

const MovieScreen = props => {
  const [movie, setMovie] = useState([]);

  useEffect(
    () => {
      fetchMovie(props.match.params.id);
    },
    [props.match.params.id]
  );

  const fetchMovie = async id => {
    const result = await axios.get(`${rootApiUrl}/movies/${id}`);
    setMovie(result.data);
  };

  const id = props.match.params.id;
  return (
    <div>
      <div className="movie-screen-container">
        <div className="movie-screen-left" />

        <div className="movie-screen-movie">
          <div className="image-container">
            <img
              src={`https://image.tmdb.org/t/p/w1000_and_h563_face/${
                movie.backdrop_path
              }`}
            />
            <div className="movie-screen-movie-overlay" />
          </div>
        </div>

        <div className="movie-screen-details-container">
          <div className="movie-screen-details">
            <div id="movie-screen-details-title">{movie.title}</div>
            <div id="tagline">
              <i>{movie.tagline}</i>
            </div>

            <div className="movie-screen-numerical-data">
              <div className="vote-average">{movie.vote_average}</div>
              <div className="release-year">
                {extractYear(movie.release_date)}
              </div>
              <div className="release-year">
                {formatFilmDuration(movie.runtime)}
              </div>
            </div>
            <div className="movie-screen-details-overview">
              {movie.overview}
            </div>
            <div className="list-data">
              <span className="label">Genres: </span>{" "}
              {movie.genres &&
                movie.genres.map(l => (
                  <Link to={`/genres/${l.id}`}>{l.name}</Link>
                ))}
            </div>

            <div className="list-data">
              <span className="label">Languages: </span>
              {movie.spoken_languages &&
                movie.spoken_languages.map(l => <div>{l.name}</div>)}
            </div>
          </div>
        </div>
      </div>

      <div className="movies-screen">
        <h3>Related</h3>
        <Movies
          // TODO: VERY BRITTLE ? AT END OF QUERY
          url={`${rootApiUrl}/movies/related/${id}?`}
          location={props.location}
        />
      </div>
    </div>
  );
};

export default MovieScreen;
