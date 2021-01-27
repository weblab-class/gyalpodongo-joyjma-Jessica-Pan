import React, { Component } from "react";
import { Link } from "@reach/router";
import NewTagInput from "../modules/NewTagInput.js";
import { get } from "../../utilities";
import CreatedTag from "../modules/CreatedTag.js";

import "../../utilities";
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
    console.log("getting the tags for the ID " + this.props.id);
    get("/api/tagsFromID", { user_id: this.props.id }).then((tags) => {
      this.setState({ createdTags: tags });
    });
  }

  createTag = () => {
    this.setState({
      creatingTag: true,
    });
  };

  submitTag = (promise) => {
    this.setState({
      creatingTag: false,
    });
    Promise.all([promise]).then(() => {
      get("/api/tagsFromID", { user_id: this.props.id }).then((tags) => {
        this.setState({ createdTags: tags });
      });
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
      return (
        <>
          <div className="cloudabsolute x2"></div>
          <div className="cloudabsolute x3"></div>
          <p> You need to be logged in to create a tag! </p>
          <div className="cloudabsolute x4"></div>
          <div className="cloudabsolute x5"></div>
        </>
      );
    }
    if (this.state.creatingTag === false) {
      return (
        <div>
          <div className="TagOthers-maindiv">
            <div className="cloudabsolute x2"></div>
            <div className="cloudabsolute x4"></div>
            <div className="cloudabsolute x5"></div>
            <div className="cloudabsolute x6"></div>
            <h2> Here you can create a new tag for a specific feeling. </h2>
            <div className="u-flex u-flex-justifyCenter">
              <button className="TagOthers-newTagButton u-pointer" onClick={this.createTag}>
                New Tag!
              </button>
            </div>
            <h2> Here are the tags you've made: </h2>
            {this.state.createdTags.map((tag, i) => (
              <CreatedTag key={`displayed-cTag-${i}`} tag={tag} tagToHTML={this.props.tagToHTML} />
            ))}
            {/* <div className="test-center" /> */}
          </div>
        </div>
      );
    }
    if (this.state.creatingTag === true) {
      return <NewTagInput onSubmit={this.submitTag} />;
    }
  }
}

export default TagOthers;
