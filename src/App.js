import React, { Component } from "react";
import qs from "query-string";

class Search extends Component {
  state = { searchInput: "" };

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
  render() {
    const queryParameters = qs.parse(this.props.location.search);

    return (
      <div>
        <Search history={this.props.history} />
        {queryParameters["search-term"]}
      </div>
    );
  }
}

export default App;
