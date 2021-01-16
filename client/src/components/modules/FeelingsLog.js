import React, { Component } from "react";
import { Link } from "@reach/router";

import { get, post } from "../../utilities";

// props:
// userId: the user id
// currentFeelings: the current feelings
class FeelingsLog extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = { feelings: [] };
  }

  componentDidMount() {
    // remember -- api calls go here!
    get("/api/feelings").then((response) => {
      this.setState({ feelings: response });
    });
  }

  render() {
    console.log(this.state.feelings);
    let currentFeelings = this.props.currentFeelings.join(", ");
    if (this.props.currentFeelings.length === 0) {
      currentFeelings = (
        <>
          You don't have any feelings recorded right now. Click <Link to="/"> here </Link> to list
          some feelings.
        </>
      );
    }

    return (
      <div>
        This is a log of all of your past feelings:
        <h2> Current Emotions: </h2>
        {currentFeelings}
        <h2> Past feelings: </h2>
        {this.state.feelings.map((feeling, i) => (
          <p key={`past-list-${i}`}>
            You felt {feeling.feeling_name} on {feeling.timestamp}
          </p>
        ))}
      </div>
    );
  }
}

export default FeelingsLog;
