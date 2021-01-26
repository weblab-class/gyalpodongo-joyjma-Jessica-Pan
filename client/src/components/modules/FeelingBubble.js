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
    let color = "color1";
    if (this.props.index % 3 === 1) {
      color = "color2";
    } else if (this.props.index % 3 === 2) {
      color = "color3";
    }
    this.state = {
      showing: false,
      feeling: tempFeeling,
      yOffset: this.props.offset * 30,
      classNames: "feelingBubble-clickable hidden",
      color: color,
    };
    this.interval = "";
    this._isMounted = false;
  }

  componentDidMount() {
    // console.log("I'm going to wait for " + this.props.index + "seconds.");
    this._isMounted = true;
    window.setTimeout(this.startAnimation, 2000 * this.props.index);
  }

  startAnimation = () => {
    this.getRandomFeeling();
    this.setState({ showing: true });
    if (this._isMounted) {
      this.interval = window.setInterval(this.getRandomFeeling, 24000);
    }
  };

  getRandomFeeling = () => {
    console.log("starting the animation " + this.props.index);
    if (this._isMounted) {
      get("/api/random_feeling_name").then((result) => {
        this.setState({ feeling: result.feeling });
      });
      const steadyNames = this.state.classNames.substr(0, this.state.classNames.lastIndexOf(" "));
      this.setState({ classNames: steadyNames + " feelingBubble-animated" });
    }
  };

  onAnimationEnd = () => {
    if (this._isMounted) {
      const steadyNames = this.state.classNames.substr(0, this.state.classNames.lastIndexOf(" "));
      this.setState({ classNames: steadyNames + " hidden" });
    }
  };

  handleClick = () => {
    this.props.addFeeling(this.state.feeling);
    this.setState({ showing: false });
  };

  componentWillUnmount() {
    console.log("UNMOUNTING");
    if (this._isMounted) {
      this.interval = window.clearInterval(this.interval);
    }
    this._isMounted = false;
  }

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
          <div
            className={this.state.classNames}
            onAnimationEnd={this.onAnimationEnd}
            onClick={this.handleClick}
          >
            <div className={"feelingBubble-main " + this.state.color}>{this.state.feeling}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default FeelingBubble;
