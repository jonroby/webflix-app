import React, { Component } from "react";
import changeCase from "change-case";
import Movies from "../Movies";

import "./MoviesScreen.scss";

const rootApiUrl = "https://webflix-server.herokuapp.com";
// const rootApiUrl = "http://localhost:4000";

class MoviesScreen extends Component {
  render() {
    const pathname = this.props.location.pathname;
    const url = `${rootApiUrl}${pathname}`;
    const title = pathname.split("/")[3];

    return (
      <div className="movies-screen">
        <h3>{changeCase.title(title)}</h3>
        <Movies url={url} location={this.props.location} />
      </div>
    );
  }
}

export default MoviesScreen;
