import React, { Component } from "react";
import SingleTag from "./SingleTag.js";

import "./UserSideBar.css";

import { get, post } from "../../utilities";

class FeeelingSection extends Component {
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

  render() {
    let taskDisplay = <p> No tasks found. </p>;
    console.log(this.state.tasks);
    if (this.state.tasks.length !== 0) {
      taskDisplay = (
        <SingleTag
          activity={this.state.tasks[Math.floor(Math.random() * this.state.tasks.length)].activity}
        />
      );
    }
    return (
      <div>
        <h2> {this.props.feeling} </h2>
        <p> That's a valid feeling. </p>
        {taskDisplay}
      </div>
    );
  }
}

export default FeeelingSection;
