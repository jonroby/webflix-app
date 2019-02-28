import React, { Component } from "react";
import throttle from "lodash.throttle";
import axios from "axios";
import Card from "./Card";

import "./Movies.scss";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      page: 1
    };

    this.throttleFetchInitialResults = throttle(this.fetchInitialResults, 1000);
  }

  componentDidMount() {
    this.fetchInitialResults(this.props.url);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.throttleFetchInitialResults(this.props.url);
    }
  }

  componentWillUnmount() {
    this.throttleFetchInitialResults = null;
  }

  fetchInitialResults = async url => {
    const response = await axios.get(url);

    this.setState({
      results: response.data.results,
      page: 1
    });
  };

  fetchMoreResults = async url => {
    const result = await axios.get(`${url}&page=${this.state.page + 1}`);

    this.setState({
      results: this.state.results.concat(result.data.results),
      page: this.state.page + 1
    });
  };

  render() {
    return (
      <div>
        <div className="movies-container">
          {this.state.results.map(r => (
            <Card key={r.id} data={r} />
          ))}
        </div>

        <button onClick={() => this.fetchMoreResults(this.props.url)}>
          Load More
        </button>
      </div>
    );
  }
}

export default Movies;
