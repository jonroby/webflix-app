import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import HomeScreen from "./Screens/HomeScreen";
import MoviesScreen from "./Screens/MoviesScreen";
import SearchScreen from "./Screens/SearchScreen";
import MovieScreen from "./Screens/MovieScreen";
import GenreScreen from "./Screens/GenreScreen";
import GenresScreen from "./Screens/GenresScreen";
import PeopleScreen from "./Screens/PeopleScreen";
import PersonScreen from "./Screens/PersonScreen";
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
              <Route path="/genres/:id" component={GenreScreen} />
              <Route path="/genres" component={GenresScreen} />
              <Route
                path="/persons/categories/:category"
                component={PeopleScreen}
              />
              <Route path="/persons/:id" component={PersonScreen} />
              <Route path="/persons" component={PeopleScreen} />

              <Route component={NotFound} />
            </Switch>
          </div>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default Routes;
