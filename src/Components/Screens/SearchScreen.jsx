import React, { Component } from "react";
import extractParameters from "../helpers/extractParameters";
import Movies from "../Movies";
import Search from "../Search";

import "./MoviesScreen.scss";

const rootApiUrl = "https://webflix-server.herokuapp.com";

class SearchScreen extends Component {
  render() {
    const searchTerm = extractParameters(this.props.location, "search-term");
    const url = `${rootApiUrl}/search/movies?queryString=${searchTerm}&`;
    return (
      <div className="movies-screen">
        <Search {...this.props} />

        <Movies url={url} location={this.props.location} />
      </div>
    );
  }
}

export default SearchScreen;
