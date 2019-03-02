//2650

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
      currentSlide: 0,
      hoverIdx: null
    };
  }

  mouseEnter = idx => event => {
    event.stopPropagation();
    this.setState({ hoverIdx: idx });
  };

  mouseLeave = idx => event => {
    event.stopPropagation();
    this.setState({ hoverIdx: null });
  };

  renderCards() {
    const numOfSlides = screenWidthToNumberOfSlides(this.props.sliderWidth);
    console.log("numOfSlides ", numOfSlides);
    let width = this.props.sliderWidth * (1 / numOfSlides);

    const hMultiplier = 1.35;
    let left = -(this.state.currentSlide * width);
    if (this.state.hoverIdx !== null) {
      const modulo = this.state.hoverIdx % numOfSlides;
      const diff = width * 1.35 - width;
      const percentOfMovement = modulo / (numOfSlides - 1);
      left -= diff * percentOfMovement;
    }

    const transition = this.state.hoverIdx !== null ? "left .35s" : "left .75s";
    return (
      <div
        className="outer-outer"
        style={{
          width: window.innerWidth,
          height: width * 0.8
        }}
      >
        <div
          className="slider-outer"
          style={{ left, transition, height: width * 0.8 }}
        >
          {/* <div className="hold"> */}
          {/* <div className="slider-title">{this.props.title}</div> */}
          <div className="slider-container">
            {this.props.data.map((i, idx) => {
              return (
                <div
                  onMouseEnter={this.mouseEnter(idx)}
                  onMouseLeave={this.mouseLeave(idx)}
                  style={{
                    width:
                      idx === this.state.hoverIdx ? width * hMultiplier : width,
                    zIndex: idx === this.state.hoverIdx ? 1 : 0
                  }}
                >
                  <Card data={i} />
                </div>
              );
            })}
            {/* </div> */}
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
    console.log(this.state);
    const numberOfSlidesToRender = screenWidthToNumberOfSlides(
      this.props.sliderWidth
    );
    let nextIdx =
      direction === "left"
        ? this.state.currentSlide - numberOfSlidesToRender
        : this.state.currentSlide + numberOfSlidesToRender;

    const last = this.props.numberOfSlides - numberOfSlidesToRender;

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
    return <React.Fragment>{this.renderCards()}</React.Fragment>;
  }
}

export default Slider;
