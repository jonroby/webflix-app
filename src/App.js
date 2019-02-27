import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import throttle from "lodash.throttle";
import extractParameters from "./helpers/extractParameters";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      page: 1
    };

    this.throttleFetchSearchResults = throttle(this.fetchSearchResults, 1500);
  }

  componentDidUpdate(prevProps) {
    const searchTerm = extractParameters(this.props.location, "search-term");
    const prevSearchTerm = extractParameters(prevProps.location, "search-term");
    if (searchTerm !== prevSearchTerm) {
      this.throttleFetchSearchResults(searchTerm);
    }
  }

  fetchSearchResults = async searchTerm => {
    const response = await axios.get(
      `https://webflix-server.herokuapp.com/search/movies?queryString=${searchTerm}`
    );

    this.setState({
      results: response.data.results
    });
  };

  loadMore = async () => {
    const searchTerm = extractParameters(this.props.location, "search-term");
    const result = await axios.get(
      `https://webflix-server.herokuapp.com/search/movies?queryString=${searchTerm}&page=${this
        .state.page + 1}`
    );

    this.setState({
      results: this.state.results.concat(result.data.results),
      page: this.state.page + 1
    });
  };

  render() {
    const searchTerm = extractParameters(this.props.location, "search-term");

    return (
      <div>
        {searchTerm}
        {this.state.results.map(r => (
          <Link key={r.id} to={`/movies/${r.id}`}>
            {r.title}
          </Link>
        ))}
        <button onClick={this.loadMore}>Load More</button>
      </div>
    );
  }
}

export default App;
