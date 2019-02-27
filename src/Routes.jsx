import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Movie from "./Movie";

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <Route path="/search/movies" component={App} />
            <Route path="/movies/:id" component={Movie} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default Routes;
