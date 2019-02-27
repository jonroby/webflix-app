import React, { Component } from "react";
import { Link } from "react-router-dom";
import throttle from "lodash.throttle";
import axios from "axios";

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
        {this.state.results.map(r => (
          <Link key={r.id} to={`/movies/${r.id}`}>
            {r.title}
          </Link>
        ))}
        <button onClick={() => this.fetchMoreResults(this.props.url)}>
          Load More
        </button>
      </div>
    );
  }
}

export default Movies;
