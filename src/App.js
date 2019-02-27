import React, { Component } from "react";

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
    return (
      <div>
        <Search history={this.props.history} />
      </div>
    );
  }
}

export default App;
