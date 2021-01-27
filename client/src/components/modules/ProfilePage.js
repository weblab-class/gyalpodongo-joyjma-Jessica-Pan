import React, { Component } from "react";
import { Link } from "@reach/router";

import { get, post } from "../../utilities";

// props:
// userId: the user id
// name: the user's name
// showFeelingsLog
// showTagsLog
// showTagOthers

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    get("/api/tags-done").then((response) => {
      this.setState({ allTags: response.reverse() });
    });
  }

  render() {
    let currentFeelings;
    if (this.props.feelings.length !== 0) {
      currentFeelings = <p> Right now you're feeling {this.props.feelings} </p>;
    }
    return (
      <div>
        <h2> Hello, {this.props.name} </h2>
        {currentFeelings}
        <button onClick={this.props.showFeelingsLog}> Past Feelings </button>
        <button onClick={this.props.showTagsLog}> Past Tags Done </button>
        <button onClick={this.props.showTagOthers}> Past Tags Created</button>
      </div>
    );
  }
}

export default ProfilePage;
