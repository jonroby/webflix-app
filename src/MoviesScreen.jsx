import React, { Component } from "react";
import extractParameters from "./helpers/extractParameters";
import Movies from "./Movies";

import "./MoviesScreen.scss";

const rootApiUrl = "https://webflix-server.herokuapp.com";

class MovieScreen extends Component {
  render() {
    const mapping = {
      "/movies/popular": () => [`${rootApiUrl}/movies/popular`, "Popular"],
      "/search/movies": () => {
        const searchTerm = extractParameters(
          this.props.location,
          "search-term"
        );
        return [
          `${rootApiUrl}/search/movies?queryString=${searchTerm}`,
          "Search Results"
        ];
      }
    };

    const pathname = this.props.location.pathname;
    const url = mapping[pathname]()[0];
    const title = mapping[pathname]()[1];

    return (
      <div className="movies-screen">
        <h3>{title}</h3>
        <Movies url={url} location={this.props.location} />
      </div>
    );
  }
}

export default MovieScreen;
