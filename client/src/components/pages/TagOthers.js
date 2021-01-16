import React, { Component } from "react";
import { Link } from "@reach/router";
import NewTagInput from "./NewTagInput.js";
import { get } from "../../utilities";

class TagOthers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      creatingTag: false,
      createdTags: [],
    };
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
  };

  showTag = (input) => {
    this.setState({
      createdTags: this.state.createdTags.concat(input),
    });
  };

  render() {
    const createdTagsList = [];
    get("/api/tags", { user_id: this.props.id }).then((tags) => {
      tags.map((tag) => createdTagsList.concat(tag));
    });
    if (this.state.creatingTag === false) {
      return (
        <div>
          <button onClick={this.createTag}>Tag Someone!</button>
          {createdTagsList.map((tag) => (
            <div>
              {`You tagged someone feeling ${tag.feeling} to do this activity: ${tag.activity}`}
            </div>
          ))}
        </div>
      );
    }
    if (this.state.creatingTag === true) {
      return <NewTagInput onSubmit={() => this.submitTag()} />;
    }
  }
}

export default TagOthers;
