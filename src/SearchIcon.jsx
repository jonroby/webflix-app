import React from "react";
import search from "./assets/searching-magnifying-glass.svg";
import searchDark from "./assets/search-magnifying-glass-black.svg";

import "./SearchIcon.scss";

const SearchIcon = ({ theme }) => {
  const type = theme === "light" ? search : searchDark;
  return <img className="search-icon" src={type} />;
};

export default SearchIcon;
