import React, { Component } from "react";

import "./FeelingBubble.css";
import { get, post } from "../../utilities.js";
import "../../utilities.css";

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
    this.state = {
      showing: false,
      feeling: tempFeeling,
      yOffset: this.props.offset * 30,
    };
  }

  componentDidMount() {
    console.log("I'm going to wait for " + this.props.index + "seconds.");
    window.setTimeout(this.startAnimation, 2000 * this.props.index);
  }

  startAnimation = () => {
    console.log("starting the animation " + this.props.index);
    this.getRandomFeeling();
    this.setState({ showing: true });
    window.setInterval(this.getRandomFeeling, 15000);
  };

  getRandomFeeling = () => {
    get("/api/random_feeling_name").then((result) => {
      this.setState({ feeling: result.feeling });
    });
  };

  handleClick = () => {
    this.props.addFeeling(this.state.feeling);
    this.setState({ showing: false });
  };

  render() {
    if (!this.state.showing) {
      return <> </>;
    }
    return (
      <div
        style={{ position: "absolute", top: 420 + this.state.yOffset + "px" }}
        className="u-flex-justifyCenter"
      >
        <div className="feelingBubble-overviewDiv">
          <div className="feelingBubble-main" onClick={this.handleClick}>
            {this.state.feeling}
          </div>
        </div>
      </div>
    );
  }
}

export default FeelingBubble;
