import React, { Component } from "react";
import throttle from "lodash.throttle";
import debounce from "lodash.debounce";
import axios from "axios";
import Card from "./Card";

import "./Movies.scss";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      page: 0,
      totalPages: 0
    };

    this.throttleFetchInitialResults = throttle(this.fetchInitialResults, 500);
    this.myRef = React.createRef();
    this.fetchMoreListener = null;
  }

  componentDidMount() {
    this.fetchInitialResults(this.props.url, this.state.page);
    this.fetchMoreListener = document.addEventListener(
      "scroll",
      debounce((...args) => {
        this.isScrolledIntoView(this.myRef);
      }, 500)
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.throttleFetchInitialResults(this.props.url, 0);
    }
  }

  componentWillUnmount() {
    this.throttleFetchInitialResults = null;
    this.fetchMoreListener = null;
  }

  fetchInitialResults = async (url, page) => {
    const response = await axios.get(`${url}`);
    this.setState({
      results: response.data.results,
      page: page + 1,
      totalPages: response.data.total_pages
    });
  };

  isScrolledIntoView = el => {
    if (!el || !el.current) return;
    const threshold = window.innerHeight;
    if (window.scrollY + threshold > el.current.offsetTop) {
      this.fetchMoreResults(this.props.url, this.state.page);
    }
  };

  fetchMoreResults = async (url, page) => {
    const nextPage = page + 1;
    const response = await axios.get(`${url}page=${nextPage}`);
    this.setState({
      results: this.state.results.concat(response.data.results),
      page: nextPage,
      totalPages: response.data.total_pages
    });
  };

  render() {
    return (
      <div>
        <div className="movies-container">
          {this.state.results.map(r => (
            <Card key={r.id} data={r} />
          ))}
        </div>

        {this.state.page <= this.state.totalPages ? (
          <div className="fetch-more" ref={this.myRef}>
            FETCH MORE
          </div>
        ) : null}
      </div>
    );
  }
}

export default Movies;
