import React, { Component } from "react";
import { Link } from "@reach/router";
import NewTagInput from "./NewTagInput.js";
import { get } from "../../utilities";

import "./TagOthers.css";

class TagOthers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      creatingTag: false,
      createdTags: [],
    };
  }

  componentDidMount() {
    get("/api/tagsFromID", { user_id: this.props.id }).then((tags) => {
      this.setState({ createdTags: tags });
    });
  }

  createTag = () => {
    this.setState({
      creatingTag: true,
    });
  };

  submitTag = () => {
    this.setState({
      creatingTag: false,
    });
    get("/api/tagsFromID", { user_id: this.props.id }).then((tags) => {
      this.setState({ createdTags: tags });
    });
  };

  showTag = (input) => {
    this.setState({
      createdTags: this.state.createdTags.concat(input),
    });
  };

  render() {
    console.log("Created tags:");
    console.log(this.state.createdTags);
    if (!this.props.id) {
      return <p> You need to be logged in to tag others! </p>;
    }
    if (this.state.creatingTag === false) {
      return (
        <div>
          <h2> Here you can create a new tag for a specific feeling. </h2>
          <div className="u-flex u-flex-justifyCenter">
            <button className="TagOthers-newTagButton" onClick={this.createTag}>
              New Tag!
            </button>
          </div>
          <h2> Here's are the tags you've made: </h2>
          {this.state.createdTags.map((tag, i) => (
            <p key={`displayed-cTag-${i}`}>
              You tagged someone feeling {tag.feeling} to do this activity:{" "}
              {this.props.tagToHTML(tag.activity)}
            </p>
          ))}
        </div>
      );
    }
    if (this.state.creatingTag === true) {
      return <NewTagInput onSubmit={this.submitTag} />;
    }
  }
}

export default TagOthers;
