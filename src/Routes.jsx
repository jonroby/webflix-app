import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import MoviesScreen from "./MoviesScreen";
import MovieScreen from "./MovieScreen";

import "./Routes.scss";

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Route path="/" component={Navbar} />
          <div className="routes-container">
            <Switch>
              <Route path="/search/movies" component={MoviesScreen} />
              <Route path="/movies/popular" component={MoviesScreen} />
              <Route path="/movies/:id" component={MovieScreen} />
            </Switch>
          </div>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default Routes;
