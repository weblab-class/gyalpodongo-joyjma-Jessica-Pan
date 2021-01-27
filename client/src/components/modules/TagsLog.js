import React, { Component } from "react";
import { Link } from "@reach/router";

import { get, post } from "../../utilities";

import "./TagsLog.css";
import "../../utilities.css";

// props:
// userId: the user id
// currentFeelings: the current feelings
class TagsLog extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = { allTags: [] };
  }

  componentDidMount() {
    get("/api/tags-done").then((response) => {
      this.setState({ allTags: response.reverse() });
    });
  }

  getTagsForFeeling = (feeling) => {
    const tagsToDisplay = this.state.allTags
      .filter((tag) => {
        return tag.feeling === feeling;
      })
      .map((tag, i) => (
        <div key={`tag-${feeling}-${i}`}> {this.props.tagToHTML(tag.activity)} </div>
      ));
    if (tagsToDisplay.length === 0) {
      return <> You haven't done any tags with this feeling in the past. </>;
    }
    return (
      <>
        <p> In the past, when you felt that way, you've done the following tasks: </p>
        <div className="TagsLog-feelingTagContainer">{tagsToDisplay}</div>
      </>
    );
  };

  render() {
    console.log(this.state.allTags);
    let currentFeelings = this.props.currentFeelings.join(", ");
    currentFeelings = this.props.currentFeelings.map((feeling, i) => (
      <div key={`tag-section-${feeling}`}>
        <h3> {feeling} </h3>
        {this.getTagsForFeeling(feeling)}
      </div>
    ));
    if (this.props.currentFeelings.length === 0) {
      currentFeelings = (
        <>
          You don't have any feelings recorded right now. Click <Link to="/"> here </Link> to list
          some feelings.
        </>
      );
    }
    const allTagsDisplay =
      this.state.allTags.length === 0 ? (
        <p> You haven't done any tags </p>
      ) : (
        this.state.allTags.map((tag, i) => (
          <span key={`past-tag-${i}`} className="TagsLog-container">
            <p className="TagsLog-feelingName"> {tag.feeling} </p>
            <span className=" u-fullWidth">{this.props.tagToHTML(tag.activity)}</span>
          </span>
        ))
      );

    return (
      <div className="TagsLog-wholeDiv">
        <h2> Here you can see a list of tags that you've done. </h2>
        <h1> Current Feelings: </h1>
        {currentFeelings}
        <h1> All past tags: </h1>
        {allTagsDisplay}
      </div>
    );
  }
}

export default TagsLog;
