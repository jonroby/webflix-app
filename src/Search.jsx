import React, { Component } from "react";
import extractParameters from "./helpers/extractParameters";

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

export default Search;
