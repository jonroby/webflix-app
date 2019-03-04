import React, { Component } from "react";
import extractParameters from "./helpers/extractParameters";
import { FaSearch as SearchIcon } from "react-icons/fa";

import "./Search.scss";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: extractParameters(props.history.location, "search-term")
    };
  }

  updateSearchInput = event => {
    console.log("this.props ", this.props);
    this.setState({ searchInput: event.target.value }, () => {
      this.props.history.push(
        `/search/movies?search-term=${this.state.searchInput}`
      );
    });
  };

  render() {
    return (
      <div className="search-container">
        <div className="search-input-container">
          <input
            className="search-input"
            onChange={this.updateSearchInput}
            value={this.state.searchInput}
            placeholder={"Search"}
          />
        </div>
      </div>
    );
  }
}

export default Search;
