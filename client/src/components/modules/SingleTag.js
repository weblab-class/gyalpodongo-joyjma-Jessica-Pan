import React, { Component } from "react";

import "./SingleTag.css";

import { get, post } from "../../utilities";

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
    console.log("You did a task!");
  };

  render() {
    let taskDisplay = <p> No tasks found. </p>;
    if (this.state.tasks.length !== 0) {
      taskDisplay = <SingleTag activity={this.state.tasks[0].activity} />;
    }
    return (
      <span>
        <p className="SingleTag-activity"> {this.props.activity} </p>
        <div className="SingleTag-done" onClick={this.taskComplete}></div>
      </span>
    );
  }
}

export default SingleTag;
