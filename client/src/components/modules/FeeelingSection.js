import React, { Component } from "react";
import SingleTag from "./SingleTag.js";

import "./UserSideBar.css";
import "./FeelingSection.css";

import { get, post } from "../../utilities";

class FeeelingSection extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = { tasks: [], seenTags: false, indexToDisplay: 0 };
  }

  componentDidMount() {
    get("/api/tags", { feeling: this.props.feeling }).then((response) => {
      const gotResults = response.length === 0;
      const indexToDisplay = Math.floor(Math.random() * this.state.tasks.length);
      this.setState({ tasks: response, seenTags: gotResults, indexToDisplay: indexToDisplay });
      console.log("getting tags done");
      get("/api/tags-done", { feeling: this.props.feeling }).then((tagsDone) => {
        console.log(tagsDone);
        this.removeTags(tagsDone);
      });
    });
  }

  removeTag = (tag) => {
    this.removeTags([tag]);
  };

  removeTags = (listOfTags) => {
    console.log("removing these tags:");
    console.log(listOfTags);
    let newTagsArray = this.state.tasks;
    for (let i = 0; i < listOfTags.length; i++) {
      newTagsArray.splice(newTagsArray.indexOf(listOfTags[i]), 1);
    }
    const indexToDisplay = Math.floor(Math.random() * (this.state.tasks.length - 1));
    this.setState({ tasks: newTagsArray, seenTags: true, indexToDisplay: indexToDisplay });
  };

  render() {
    let taskDisplay = this.state.seenTags ? (
      <p> You have seen all tags for this emotion. </p>
    ) : (
      <p> No tasks found. </p>
    );
    console.log(this.state.tasks);
    if (this.state.tasks.length !== 0) {
      const tagToDisplay = this.state.tasks[Math.floor(Math.random() * this.state.tasks.length)];
      taskDisplay = (
        <SingleTag tag={tagToDisplay} userId={this.props.userId} removeTag={this.removeTag} />
      );
    }
    return (
      <div className="FeelingSection-section">
        <h1> {this.props.feeling} </h1>
        <p> That's a valid feeling. </p>
        {taskDisplay}
      </div>
    );
  }
}

export default FeeelingSection;
