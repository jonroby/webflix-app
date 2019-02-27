import React, { Component } from "react";
import Search from "./Search";

import "./Navbar.scss";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-outer">
        <div className="navbar-inner">
          <div className="navbar-logo">WEBFLIX</div>
          <Search history={this.props.history} />
          <div className="navbar-dummy">WEBFLIX</div>
        </div>
      </div>
    );
  }
}

export default Navbar;
