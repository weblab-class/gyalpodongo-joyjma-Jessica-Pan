import React, { Component } from "react";

import "./SingleTag.css";

import { get, post } from "../../utilities";

// props: tag, userId
class SingleTag extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = { tasks: [] };
  }

  componentDidMount() {
    get("/api/tags", { feeling: this.props.feeling }).then((response) => {
      this.setState({ tasks: response });
    });
  }

  taskComplete = () => {
    console.log("task complete");
  };

  render() {
    return (
      <span>
        <span className="SingleTag-activity"> {this.props.tag.activity} </span>
        <button className="SingleTag-done" onClick={this.taskComplete}></button>
      </span>
    );
  }
}

export default SingleTag;
