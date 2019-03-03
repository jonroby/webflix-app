import React, { Component } from "react";
import Slider from "./Slider";

import "./ListOfSliders.scss";

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

class ListOfSliders extends Component {
  constructor(props) {
    super(props);

    // types can come from props
    const types = [
      // "Latest",
      // "NowPlaying"
      "Popular"
      // "Top",
      // "Rated",
      // "Upcoming",
      // "Trending"
    ];
    const lists = types.reduce((prev, curr) => prev.set(curr, []), new Map());

    this.state = {
      lists,
      sliderWidth: 1, // Change this name to visibleSlidersLength
      numberOfSlides: 0
    };

    this.listOfSlidersRef = React.createRef();
  }

  // fetchList = async listname => {
  //   const rootApiUrl = "https://webflix-server.herokuapp.com";
  //   const url = `${rootApiUrl}/movies/popular`;
  //   const response = await axios.get(`${url}`);
  //   const newLists = new Map(this.state.lists);
  //   newLists.set(listname, response.data.results);
  //   this.setState({
  //     lists: newLists
  //   });
  // };

  componentDidMount() {
    // loop or promise.all or only do top with webpack?
    // Array.from(this.state.lists, ([k]) => {
    //   this.fetchList(k);
    // });

    window.addEventListener("resize", this.sliderWidth);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.sliders["Popular"].length !==
      this.props.sliders["Popular"].length
    ) {
      this.sliderWidth(); // Initial
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.sliderWidth);
  }

  sliderWidth = () => {
    // Check width here
    const slider = this.listOfSlidersRef;
    if (!slider.current) return;
    const sidesWidth = 120; // 60px * 2 // 30px * 2
    const sliderWidth = slider.current.offsetWidth - sidesWidth;
    this.setState({ sliderWidth });
  };

  render() {
    const numOfSlides = screenWidthToNumberOfSlides(this.state.sliderWidth);
    let width = this.state.sliderWidth * (1 / numOfSlides);
    return (
      <div className="list-of-sliders" ref={this.listOfSlidersRef}>
        {Object.keys(this.props.sliders)
          .map(k => {
            if (this.props.sliders[k].length <= 0) return null;
            return (
              <div style={{ height: width * 0.8 * 1.5 }}>
                <Slider
                  title={k}
                  listOfSlidersRef={this.listOfSlidersRef}
                  sliderWidth={this.state.sliderWidth}
                  numberOfSlides={this.props.sliders[k].length}
                  data={this.props.sliders[k]}
                />
              </div>
            );
          })
          .filter(i => i)}
        <div className="buffer" />
      </div>
    );
  }
}

export default ListOfSliders;
