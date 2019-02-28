import React, { Component } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

import "./Navbar.scss";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-outer">
        <div className="navbar-inner">
          <Link to={`/`}>
            <div className="navbar-logo">WEBFLIX</div>
          </Link>
          <Search history={this.props.history} />
          <div className="navbar-dummy">WEBFLIX</div>
        </div>
      </div>
    );
  }
}

export default Navbar;
