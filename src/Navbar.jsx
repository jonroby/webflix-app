import React, { Component } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import SearchIcon from "./SearchIcon";

import "./Navbar.scss";

class Navbar extends Component {
  state = {
    scrolledToTop: true
  };

  componentDidMount() {
    window.addEventListener("scroll", this.scrolledDown);
  }

  componentDidUnmount() {
    window.removeAddListener("scroll", this.scrolledDown);
  }

  scrolledDown = () => {
    this.setState({ scrolledToTop: window.scrollY < 15 });
  };

  render() {
    const isHome = this.props.location.pathname === "/";
    const isScrolledToTop = this.state.scrolledToTop;
    const style =
      isHome && this.state.scrolledToTop ? "navbar-outer-home" : "navbar-outer";

    const searchIconColor =
      isHome && this.state.scrolledToTop ? "light" : "dark";
    console.log("searchIconcolor ", searchIconColor);

    return (
      <div className={style}>
        <div className="navbar-inner">
          <Link to={`/`}>
            <div className="navbar-logo">WEBFLIX</div>
          </Link>
          <Link to="/search/movies">
            <div className="navbar-right">
              <SearchIcon theme={searchIconColor} />
              <div>Search</div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Navbar;
