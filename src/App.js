import React, { Component } from "react";
import axios from "axios";
import qs from "query-string";
import throttle from "lodash.throttle";

const extractParameters = (location, term) => {
  const parameters = qs.parse(location.search);
  return parameters && parameters[term];
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: extractParameters(props.history.location, "search-term")
    };
  }

  updateSearchInput = event => {
    this.setState({ searchInput: event.target.value }, () => {
      this.props.history.push(
        `/search/movies?search-term=${this.state.searchInput}`
      );
    });
  };

  render() {
    return (
      <div>
        <input
          onChange={this.updateSearchInput}
          value={this.state.searchInput}
        />
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: []
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
      searchResults: response.data.results
    });
  };

  render() {
    const searchTerm = extractParameters(this.props.location, "search-term");

    return (
      <div>
        <Search history={this.props.history} />
        {searchTerm}
        {this.state.searchResults.map(r => (
          <div>{r.title}</div>
        ))}
      </div>
    );
  }
}

export default App;
