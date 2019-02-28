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
      results: new Set(),
      page: 0,
      totalPages: 0
    };

    this.debounceFetchInitialResults = debounce(this.fetchInitialResults, 500);
    this.myRef = React.createRef();
    // this.fetchMoreListener = null;
  }

  componentDidMount() {
    this.fetchInitialResults(this.props.url, this.state.page);
    window.addEventListener(
      "scroll",
      throttle(() => {
        this.isScrolledIntoView(this.myRef);
      }, 500)
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.setState({ results: [], page: 0, totalPages: 0 }, () => {
        this.debounceFetchInitialResults(this.props.url, 0);
        window.scrollTo(0, 0);
      });
    }
  }

  componentWillUnmount() {
    this.debounceFetchInitialResults = null;
    window.removeEventListener("scroll", this.fetchMoreListener, false);
  }

  fetchInitialResults = async (url, page = 0) => {
    const response = await axios.get(`${url}`);
    this.setState({
      results: new Set(response.data.results),
      page: page + 1,
      totalPages: response.data.total_pages
    });
  };

  isScrolledIntoView = el => {
    if (!el || !el.current) return;
    if (window.scrollY + window.innerHeight + 500 > el.current.offsetTop) {
      this.fetchMoreResults(this.props.url, this.state.page);
    }
  };

  fetchMoreResults = async (url, page) => {
    const nextPage = page + 1;
    const response = await axios.get(`${url}page=${nextPage}`);
    this.setState({
      results: new Set([...this.state.results].concat(response.data.results)),
      page: nextPage,
      totalPages: response.data.total_pages
    });
  };

  render() {
    return (
      <div>
        <div className="movies-container">
          {[...this.state.results].map(r => (
            <Card key={r.id} data={r} />
          ))}
        </div>
        {this.state.page >= this.state.totalPages ? (
          <div>No More Results</div>
        ) : null}
        <div className="fetch-more" ref={this.myRef}>
          FETCH MORE
        </div>
      </div>
    );
  }
}

export default Movies;
