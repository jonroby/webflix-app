import React, { Component } from "react";
import Search from "./Search";

class Navbar extends Component {
  render() {
    return (
      <div>
        <Search history={this.props.history} />
      </div>
    );
  }
}

export default Navbar;
