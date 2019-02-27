import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import App from "./App";
import Movie from "./Movie";

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Route path="/" component={Navbar} />
          <Switch>
            <Route path="/movies/:id" component={Movie} />
            <Route path="/search/movies" component={App} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default Routes;
