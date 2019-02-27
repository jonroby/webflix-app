import React, { Component } from "react";
import extractParameters from "./helpers/extractParameters";
import Movies from "./Movies";

const rootApiUrl = "https://webflix-server.herokuapp.com";

class MovieScreen extends Component {
  render() {
    const mapping = {
      "/movies/popular": () => `${rootApiUrl}/movies/popular`,
      "/search/movies": () => {
        const searchTerm = extractParameters(
          this.props.location,
          "search-term"
        );
        return `${rootApiUrl}/search/movies?queryString=${searchTerm}`;
      }
    };

    const pathname = this.props.location.pathname;
    const url = mapping[pathname]();

    return (
      <div>
        <Movies url={url} location={this.props.location} />
      </div>
    );
  }
}

export default MovieScreen;
