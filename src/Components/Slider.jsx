import React, { Component } from "react";
import MovieCard from "./MovieCard";
import { ChevronLeft, ChevronRight } from "./Icons/Chevron";

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
      hoverIdx: null,
      sliderWidth: 1, // Change this name to visibleSlidersLength
      // numberOfSlides: 0,
      height: 100
    };

    this.listOfSlidersRef = React.createRef();
  }

  mouseEnter = idx => event => {
    event.stopPropagation();
    this.setState({ hoverIdx: idx });
  };

  mouseLeave = idx => event => {
    event.stopPropagation();
    this.setState({ hoverIdx: null });
  };

  setSliderWidth = () => {
    // Check width here
    const slider = this.listOfSlidersRef;
    if (!slider.current) return;
    const sidesWidth = 120; // 60px * 2 // 30px * 2
    const sliderWidth = slider.current.offsetWidth - sidesWidth;
    this.setState({ sliderWidth });
  };

  componentDidMount() {
    // loop or promise.all or only do top with webpack?
    // Array.from(this.state.lists, ([k]) => {
    //   this.fetchList(k);
    // });

    window.addEventListener("resize", this.setSliderWidth);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.children.length !== this.props.children.length) {
      this.setSliderWidth(); // Initial
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.sliderWidth);
  }

  renderCards() {
    const numOfSlides = screenWidthToNumberOfSlides(this.state.sliderWidth);

    let width = this.state.sliderWidth * (1 / numOfSlides);

    const hMultiplier = 1.35;
    let left = -(this.state.currentSlide * width);
    if (this.state.hoverIdx !== null) {
      const modulo = this.state.hoverIdx % numOfSlides;
      const diff = width * 1.35 - width;
      const percentOfMovement = modulo / (numOfSlides - 1);
      left -= diff * percentOfMovement;
    }

    const transition = this.state.hoverIdx !== null ? "left .35s" : "left .75s";

    const first = this.state.currentSlide;
    const remaining = this.props.children.length - this.state.currentSlide;

    const firstSplits = Math.ceil(first / numOfSlides);
    const remainingSplits = Math.ceil(remaining / numOfSlides);
    const total = firstSplits + remainingSplits;

    const activeBlock = Math.ceil(this.state.currentSlide / numOfSlides);

    return (
      <div className="slider-outer">
        <div className="slider-top">
          <div className="slider-title">{this.props.title}</div>
          <div className="slider-blocks-container">
            <div className="slider-blocks">
              {new Array(total).fill(0).map((b, i) => (
                <div className={i === activeBlock ? "active-block" : "block"} />
              ))}
            </div>
          </div>
        </div>

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
            <div className="slider-container">
              {this.props.children.map((i, idx) => {
                return (
                  <div
                    onMouseEnter={this.mouseEnter(idx)}
                    onMouseLeave={this.mouseLeave(idx)}
                    style={{
                      width:
                        idx === this.state.hoverIdx
                          ? width * hMultiplier
                          : width,
                      zIndex: idx === this.state.hoverIdx ? 1 : 0
                    }}
                  >
                    {i}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="button-left" onClick={() => this.toggle("left")}>
            {this.state.currentSlide > 0 ? <ChevronLeft /> : null}
          </div>

          <div className="button-right" onClick={() => this.toggle("right")}>
            {this.state.currentSlide + numOfSlides <
            this.props.children.length ? (
              <ChevronRight />
            ) : null}
          </div>
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

    const last = this.props.children.length - numberOfSlidesToRender;

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
    const numOfSlides = screenWidthToNumberOfSlides(this.state.sliderWidth);
    let width = this.state.sliderWidth * (1 / numOfSlides);
    return (
      <div style={{ height: width * 0.8 * 1.35 }} ref={this.listOfSlidersRef}>
        {this.renderCards()}
      </div>
    );
  }
}

export default Slider;
