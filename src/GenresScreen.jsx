import React, { Component } from "react";
import changeCase from "change-case";
import Movies from "./Movies";
import genresIdToName from "./api/genresIdToName";
import "./MoviesScreen.scss";

const rootApiUrl = "https:webflix-server.herokuapp.com";

class GenresScreen extends Component {
  render() {
    const pathname = this.props.location.pathname;
    const url = `${rootApiUrl}${pathname}`;
    const title = pathname.split("/")[2];

    return (
      <div className="movies-screen">
        <h3>{changeCase.title(genresIdToName[title])}</h3>
        <Movies url={url} location={this.props.location} />
      </div>
    );
  }
}

export default GenresScreen;
