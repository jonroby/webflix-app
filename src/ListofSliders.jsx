import React, { Component } from "react";
import Slider from "./Slider";
import axios from "axios";

class ListOfSliders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  fetchList = async listname => {
    const rootApiUrl = "https://webflix-server.herokuapp.com";
    const url = `${rootApiUrl}/movies/${listname}`;
    const response = await axios.get(`${url}`);
    this.setState({
      results: response.data.results
      // page: page + 1,
      // totalPages: response.data.total_pages
    });
  };
  componentDidMount() {
    this.fetchList("popular");
  }

  render() {
    console.log("this.state ", this.state);
    return (
      <div>
        {this.state.results.length > 0 ? (
          <Slider data={this.state.results} />
        ) : null}
      </div>
    );
  }
}

export default ListOfSliders;
