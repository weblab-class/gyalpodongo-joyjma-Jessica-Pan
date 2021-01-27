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
    this.state = { tasks: [], seenTags: false, indexToDisplay: 0, phrase: phrase, ready: false };
  }

  componentDidMount() {
    get("/api/tags", { feeling: this.props.feeling }).then((response) => {
      const gotResults = response.length !== 0;
      // console.log("here are the tags that I found for the feeling " + this.props.feeling + ":");
      // console.log(response);
      const indexToDisplay = Math.floor(Math.random() * this.state.tasks.length);
      this.setState({
        tasks: response,
        seenTags: gotResults,
        indexToDisplay: indexToDisplay,
        ready: false,
      });
      console.log("here's all the tags: ");
      console.log(response);
      console.log("getting tags done");
      if (this.props.userId) {
        get("/api/tags-done", { feeling: this.props.feeling }).then((tagsDone) => {
          if (tagsDone.length !== 0) {
            console.log(tagsDone);
            this.removeTags(tagsDone);
          } else {
            this.setState({ ready: true });
          }
        });
      } else {
        this.setState({ ready: true });
      }
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
    console.log("Final tag list: ");
    console.log(newTagsArray);
    this.setState({
      tasks: newTagsArray,
      seenTags: true,
      indexToDisplay: indexToDisplay,
      ready: true,
    });
  };

  render() {
    console.log("RENDERING");
    console.log(this.state.ready);
    let taskDisplay = <> Loading... </>;
    if (this.state.ready) {
      taskDisplay = this.state.seenTags ? (
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
      if (this.state.tasks.length !== 0 && this.state.tasks[0].activity !== undefined) {
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
      // console.log("Here's the seenTags for the emotion " + this.props.feeling);
      // console.log(this.state.seenTags);
      // console.log(this.state.tasks);
    }
    return (
      <div className="FeelingSection-section">
        <h1> {this.props.feeling} </h1>
        <span className="FeelingSection-moveUp">
          <p> {this.state.phrase} </p>
          {taskDisplay}
        </span>
      </div>
    );
  }
}

export default FeeelingSection;
