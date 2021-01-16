import React, { Component } from "react";

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
    // remember -- api calls go here!
  }

  render() {
    let taskDisplay = "No tasks found.";
    if (this.state.tasks.length !== 0) {
      taskDisplay = this.state.tasks[0].activity;
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
