import React, { Component } from "react";

import "./FeelingBubble.css";

class FeelingBubble extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = { tasks: [] };
  }

  componentDidMount() {}

  handleClick = () => {
    this.props.addFeeling(this.props.feeling);
  };

  render() {
    return (
      <div className="feelingBubble" onClick={this.handleClick}>
        {this.props.feeling}
      </div>
    );
  }
}

export default FeelingBubble;
