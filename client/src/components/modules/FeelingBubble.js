import React, { Component } from "react";

import "./FeelingBubble.css";
import { get, post } from "../../utilities.js";

class FeelingBubble extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    const tempFeeling = [
      "Happy",
      "Tired",
      "Anxious",
      "Sad",
      "Excited",
      "Adventorous",
      "Overwhelmed",
    ][this.props.index % 7];
    this.state = { showing: true, feeling: tempFeeling };
  }

  componentDidMount() {
    get("/api/random_feeling_name").then((result) => {
      this.setState({ feeling: result.feeling });
    });
  }

  handleClick = () => {
    this.props.addFeeling(this.state.feeling);
    this.setState({ showing: false });
  };

  render() {
    if (!this.state.showing) {
      return <> </>;
    }
    return (
      <div className="feelingBubble" onClick={this.handleClick}>
        {this.state.feeling}
      </div>
    );
  }
}

export default FeelingBubble;
