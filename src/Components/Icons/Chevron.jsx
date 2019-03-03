import React from "react";
import left from "../../assets/left-chevron.svg";
import right from "../../assets/right-chevron.svg";

import "./Chevron.scss";

const ChevronLeft = () => {
  return <img className="chevron" src={left} />;
};

const ChevronRight = () => {
  return <img className="chevron" src={right} />;
};

export { ChevronLeft, ChevronRight };
