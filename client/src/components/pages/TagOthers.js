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

  componentDidMount() {
    get("/api/tags", { user_id: this.props.id }).then((tags) => {
      this.setState({ createdTag: tags });
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
    get("/api/tags", { user_id: this.props.id }).then((tags) => {
      this.setState({ createdTag: tags });
    });
  };

  showTag = (input) => {
    this.setState({
      createdTags: this.state.createdTags.concat(input),
    });
  };

  render() {
    console.log(this.state.createdTags);
    if (this.props.userId) {
      return <p> You need to be logged in to tag others! </p>;
    }
    if (this.state.creatingTag === false) {
      return (
        <div>
          <button onClick={this.createTag}>Tag Someone!</button>
          {this.state.createdTags.map((tag) => (
            <div>
              {`You tagged someone feeling ${tag.feeling} to do this activity: ${tag.activity}`}
            </div>
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
