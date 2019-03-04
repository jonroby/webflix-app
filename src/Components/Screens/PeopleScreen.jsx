import React, { Component } from "react";
import changeCase from "change-case";
import genresIdToName from "../../api/genresIdToName";
import axios from "axios";
import Slider from "../Slider";
import PersonCard from "../PersonCard";

import "./MoviesScreen.scss";

const rootApiUrl = "https:webflix-server.herokuapp.com";
const path = "/persons/categories";

const map = {
  popular: "/popular",
  trending: "/trending"
};

const initializeState = map => {
  return Object.keys(map).reduce((prev, curr) => {
    prev[curr] = [];
    return prev;
  }, {});
};

class PeopleScreen extends Component {
  state = initializeState(map);

  componentDidMount() {
    // Group these into the first two and then the rest
    Object.keys(this.state).forEach(stateKey => {
      this.fetchList(`${rootApiUrl}${path}${map[stateKey]}`, stateKey);
    });
  }

  fetchList = async (url, stateKey) => {
    const response = await axios.get(url);
    this.setState({
      [stateKey]: response.data.results
    });
  };

  render() {
    return (
      <div>
        {Object.keys(this.state).map(name => (
          <Slider
            title={changeCase.title(name)}
            titleLink={`/persons/categories/${name}`}
          >
            {this.state[name].map(movie => (
              <PersonCard data={movie} />
            ))}
          </Slider>
        ))}
      </div>
    );
  }
}

export default PeopleScreen;
