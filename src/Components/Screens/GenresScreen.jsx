import React, { Component } from "react";
import changeCase from "change-case";
import genresIdToName from "../../api/genresIdToName";
import axios from "axios";
import Slider from "../Slider";
import MovieCard from "../MovieCard";

import "./MoviesScreen.scss";

const rootApiUrl = "https:webflix-server.herokuapp.com";
const path = "/genres";

class GenresScreen extends Component {
  state = {};

  componentDidMount() {
    console.log("genreIdsToName ", genresIdToName);
    Object.keys(genresIdToName)
      .slice(17)
      .forEach(k => {
        console.log("here ");
        this.fetchList(`${path}/${k}`, k);
        // console.log("response ", response);
        // this.setState({ [k]: response.data.results });
      });
  }

  fetchList = async (path, key) => {
    const url = `${rootApiUrl}${path}`;
    console.log("url ", url);
    const response = await axios.get(`${url}`);
    console.log("response ", response);
    const name = genresIdToName[key];
    this.setState({
      [name]: [key, response.data.results]
    });
  };

  render() {
    return (
      <div>
        {Object.keys(this.state).map(name => (
          <Slider
            title={changeCase.title(name)}
            titleLink={`genres/${this.state[name][0]}`}
          >
            {this.state[name][1].map(movie => (
              <MovieCard data={movie} />
            ))}
          </Slider>
        ))}
      </div>
    );
  }
}

export default GenresScreen;
