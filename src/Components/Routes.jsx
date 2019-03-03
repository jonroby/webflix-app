import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import HomeScreen from "./Screens/HomeScreen";
import MoviesScreen from "./Screens/MoviesScreen";
import SearchScreen from "./Screens/SearchScreen";
import MovieScreen from "./Screens/MovieScreen";
import GenresScreen from "./Screens/GenresScreen";
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
              <Route path="/genres/:id" component={GenresScreen} />
              {/* <Route path="/genres" component={GenresScreen} /> */}
              {/* <Route path="/people" component={GenresScreen} /> */}

              <Route component={NotFound} />
            </Switch>
          </div>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default Routes;
