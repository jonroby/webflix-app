import React, { Component } from "react";
import axios from "axios";
import ListOfSliders from "../ListOfSliders";
import formatFilmDuration from "../../helpers/formatFilmDuration";
import extractYear from "../../helpers/extractYear";

import "./HomeScreen.scss";

const rootApiUrl = "https://webflix-server.herokuapp.com";

const LATEST = "Latest";
const POPULAR = "Popular";
const TRENDING = "Trending";
const NOW_PLAYING = "Now Playing";
const TOP_RATED = "Top Rated";
const UPCOMING = "Upcoming";

const routeConstants = {
  LATEST,
  POPULAR,
  TRENDING,
  NOW_PLAYING,
  TOP_RATED,
  UPCOMING
};

const routePaths = {
  [LATEST]: "/movies/categories/latest",
  [POPULAR]: "/movies/categories/popular",
  [TRENDING]: "/movies/categories/trending",
  [NOW_PLAYING]: "/movies/categories/now-playing",
  [TOP_RATED]: "/movies/categories/top-rated",
  [UPCOMING]: "/movies/categories/upcoming"
};

// const types = [
//   { title: "Popular", route: "/movies/popular" },
//   { title: "Trending", route: "/movies/trending" },
//   { title: "Now Playing", route: "/movies/now-playing" },
//   { title: "Top Rated", route: "/movies/top-rated" },
//   { title: "Upcoming", route: "/movies/upcoming" }
// ];

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliders: {
        [routeConstants.POPULAR]: [],
        [routeConstants.TRENDING]: [],
        [routeConstants.NOW_PLAYING]: [],
        [routeConstants.TOP_RATED]: [],
        [routeConstants.UPCOMING]: []
      },
      latest: {}
    };
  }

  componentDidMount() {
    this.fetch("/movies/399579", "latest");
    Object.keys(this.state.sliders).forEach(s => {
      this.fetchList(routePaths[s], s);
    });
  }

  fetch = async (path, key) => {
    const url = `${rootApiUrl}${path}`;
    const response = await axios.get(`${url}`);
    console.log("response ", response.data);
    this.setState({ [key]: response.data });
  };

  fetchList = async (path, key) => {
    const url = `${rootApiUrl}${path}`;
    const response = await axios.get(`${url}`);
    const newLists = { ...this.state.sliders, [key]: response.data.results };
    this.setState({
      sliders: newLists
    });
  };

  render() {
    const { latest: movie } = this.state;
    if (!this.state.latest) return null;
    return (
      <div className="home-screen">
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
                {movie.genres && movie.genres.map(l => <div>{l.name}</div>)}
              </div>

              <div className="list-data">
                <span className="label">Languages: </span>
                {movie.genres &&
                  movie.spoken_languages.map(l => <div>{l.name}</div>)}
              </div>
            </div>
          </div>
        </div>

        <ListOfSliders sliders={this.state.sliders} />
      </div>
    );
  }
}

export default HomeScreen;
