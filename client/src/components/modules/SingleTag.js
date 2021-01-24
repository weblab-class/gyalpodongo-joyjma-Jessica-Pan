import React, { Component } from "react";

import "./SingleTag.css";

import { get, post } from "../../utilities";

// props: tag, userId
class SingleTag extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  taskComplete = () => {
    console.log("HEREE ");
    post("/api/task-complete", { tagId: this.props.tag.tag_id, userId: this.props.userId });
    this.props.removeTag(this.props.tag);
  };

  render() {
    return (
      <span className="SingleTag-container">
        <span className="SingleTag-activity">{this.props.tagToHTML(this.props.tag.activity)}</span>
        <span className="SingleTag-buttonSpan">
          <button
            className="SingleTag-button"
            onClick={() => {
              this.props.removeTag(this.props.tag);
            }}
          >
            Get a new task
          </button>
          <button className="SingleTag-button" onClick={this.taskComplete}>
            Complete
          </button>
        </span>
      </span>
    );
  }
}

export default SingleTag;
