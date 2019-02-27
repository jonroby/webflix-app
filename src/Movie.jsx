import React, { Component } from "react";

class Movie extends Component {
  render() {
    const id = this.props.match.params.id;
    return <div>{id}</div>;
  }
}

export default Movie;
