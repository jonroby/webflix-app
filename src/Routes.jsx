import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import MoviesScreen from "./MoviesScreen";
import MovieScreen from "./MovieScreen";

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Route path="/" component={Navbar} />
          <Switch>
            <Route path="/search/movies" component={MoviesScreen} />
            <Route path="/movies/popular" component={MoviesScreen} />
            <Route path="/movies/:id" component={MovieScreen} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default Routes;
