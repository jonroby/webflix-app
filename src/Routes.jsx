import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import HomeScreen from "./HomeScreen";
import MoviesScreen from "./MoviesScreen";
import SearchScreen from "./SearchScreen";
import MovieScreen from "./MovieScreen";
import NotFound from "./NotFound";

import "./Routes.scss";

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Route path="/" component={Navbar} />
          <div className="routes-container">
            <Switch>
              <Route exact path="/" component={HomeScreen} />
              <Route path="/search/movies" component={SearchScreen} />
              <Route
                path="/movies/categories/:category"
                component={MoviesScreen}
              />
              <Route path="/movies/:id" component={MovieScreen} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default Routes;
