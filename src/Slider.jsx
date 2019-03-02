import React, { Component } from "react";
import Card from "./Card";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "./Slider.scss";

const screenWidthToNumberOfSlides = width => {
  const map = {
    450: 2, // 0.5,
    700: 3, // 0.3333,
    900: 4, // 0.25,
    1100: 5, //0.2,
    1500: 6 //0.18
  };
  const cardWidth = Object.keys(map)
    .sort((a, b) => a - b)
    .reduce((prev, curr) => {
      if (width > curr) {
        return map[curr];
      } else {
        return prev;
      }
    }, 1);

  return cardWidth;
};

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderWidth: 1,
      currentSlide: 0,
      numberOfSlides: 0,
      hoverIdx: null
    };

    this.sliderRef = React.createRef();
  }

  componentDidMount() {
    this.setState({ numberOfSlides: this.props.data.length });
    this.sliderWidth(this.sliderRef)(); // Initial
    window.addEventListener("resize", this.sliderWidth(this.sliderRef));
  }

  componentDidUpdate() {
    // this.setState({ numberOfSlides: this.props.data.length });
  }

  sliderWidth = slider => () => {
    // Check width here
    const sidesWidth = 120;
    const sliderWidth = slider.current.offsetWidth - sidesWidth;
    this.setState({ sliderWidth });
  };

  mouseEnter = idx => event => {
    event.stopPropagation();
    this.setState({ hoverIdx: idx });
  };

  mouseLeave = idx => event => {
    event.stopPropagation();
    this.setState({ hoverIdx: null });
  };

  renderCards() {
    const numOfSlides = screenWidthToNumberOfSlides(this.state.sliderWidth);
    let width = this.state.sliderWidth * (1 / numOfSlides);

    let left = -(this.state.currentSlide * width);
    if (this.state.hoverIdx !== null) {
      const modulo = this.state.hoverIdx % numOfSlides;
      const diff = width * 1.5 - width;
      const percentOfMovement = modulo / (numOfSlides - 1);
      left -= diff * percentOfMovement;
    }

    const transition = this.state.hoverIdx !== null ? "left .35s" : "left .75s";
    return (
      <div
        className="outer-outer"
        style={{ width: window.innerWidth, height: width * 1.5 * 0.7904114 }}
      >
        <div className="slider-outer" style={{ left, transition }}>
          <div
            className="slider-container"
            style={{ height: width * 1.5 * 0.7904114 }}
          >
            {this.props.data.map((i, idx) => {
              return (
                <div
                  onMouseEnter={this.mouseEnter(idx)}
                  onMouseLeave={this.mouseLeave(idx)}
                  style={{
                    width: idx === this.state.hoverIdx ? width * 1.5 : width
                  }}
                >
                  <Card data={i} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="button-left" onClick={() => this.toggle("left")}>
          <FaChevronLeft />
        </div>
        <div className="button-right" onClick={() => this.toggle("right")}>
          <FaChevronRight />
        </div>
      </div>
    );
  }

  getNextSlideIdx = direction => {
    const numberOfSlidesToRender = screenWidthToNumberOfSlides(
      this.state.sliderWidth
    );
    let nextIdx =
      direction === "left"
        ? this.state.currentSlide - numberOfSlidesToRender
        : this.state.currentSlide + numberOfSlidesToRender;
    const last = this.state.numberOfSlides - numberOfSlidesToRender;
    if (nextIdx > last) {
      nextIdx = last;
    }

    if (nextIdx < 0) {
      nextIdx = 0;
    }

    return nextIdx;
  };

  toggle = direction => {
    this.setState({ currentSlide: this.getNextSlideIdx(direction) });
  };

  render() {
    return <div ref={this.sliderRef}>{this.renderCards()}</div>;
  }
}

export default Slider;
