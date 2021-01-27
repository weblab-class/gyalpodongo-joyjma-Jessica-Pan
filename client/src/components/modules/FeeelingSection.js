import React, { Component } from "react";
import SingleTag from "./SingleTag.js";

import "./UserSideBar.css";
import "./FeelingSection.css";

import { get, post } from "../../utilities";

class FeeelingSection extends Component {
  constructor(props) {
    super(props);
    const phraseOptions = [
      "That's a valid feeling.",
      "Glad you're here!",
      "Everyone feels that way sometimes.",
      "It makes sense that you feel that way.",
      "It's good that you're aware of your emotions.",
      "That's valid.",
      "You're justified in feeling that way.",
    ];
    const phrase = phraseOptions[Math.floor(Math.random() * phraseOptions.length)];
    this.state = { tasks: [], seenTags: false, indexToDisplay: 0, phrase: phrase };
  }

  componentDidMount() {
    get("/api/tags", { feeling: this.props.feeling }).then((response) => {
      const gotResults = response.length !== 0;
      // console.log("here are the tags that I found for the feeling " + this.props.feeling + ":");
      // console.log(response);
      const indexToDisplay = Math.floor(Math.random() * this.state.tasks.length);
      this.setState({ tasks: response, seenTags: gotResults, indexToDisplay: indexToDisplay });
      console.log("getting tags done");
      get("/api/tags-done", { feeling: this.props.feeling }).then((tagsDone) => {
        if (tagsDone.length !== 0) {
          console.log(tagsDone);
          this.removeTags(tagsDone);
        }
      });
    });
  }

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
      <p>
        You have seen all tags for this emotion. Click{" "}
        <span className="FeelingSection-link" onClick={this.props.showTagOthers}>
          here
        </span>{" "}
        to create new tag.
      </p>
    ) : (
      <p> No tasks found. </p>
    );
    // console.log("Here's the seenTags for the emotion " + this.props.feeling);
    // console.log(this.state.seenTags);
    // console.log(this.state.tasks);
    if (this.state.tasks.length !== 0) {
      const tagToDisplay = this.state.tasks[Math.floor(Math.random() * this.state.tasks.length)];
      taskDisplay = (
        <SingleTag
          tag={tagToDisplay}
          userId={this.props.userId}
          tagToHTML={this.props.tagToHTML}
          removeTag={(tag) => this.removeTags([tag])}
        />
      );
    }
    return (
      <div className="FeelingSection-section">
        <h1> {this.props.feeling} </h1>
        <p> {this.state.phrase} </p>
        {taskDisplay}
      </div>
    );
  }
}

export default FeeelingSection;
