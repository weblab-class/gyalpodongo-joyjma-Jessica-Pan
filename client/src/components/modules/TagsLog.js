import React, { Component } from "react";
import { Link } from "@reach/router";

import { get, post } from "../../utilities";

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
      this.setState({ allTags: response });
    });
  }

  getTagsForFeeling = (feeling) => {
    const tagsToDisplay = this.state.allTags
      .filter((tag) => {
        return tag.feeling === feeling;
      })
      .map((tag, i) => <li key={`tag-${feeling}-${i}`}> {tag.activity} </li>);
    if (tagsToDisplay.length === 0) {
      return <> You haven't done any tags with this feeling in the past. </>;
    }
    return (
      <>
        <p> In the past, when you felt that way, you've done the following tasks: </p>
        <ul>{tagsToDisplay}</ul>
      </>
    );
  };

  render() {
    console.log(this.state.allTags);
    let currentFeelings = this.props.currentFeelings.join(", ");
    if (this.props.currentFeelings.length === 0) {
      currentFeelings = (
        <>
          You don't have any feelings recorded right now. Click <Link to="/"> here </Link> to list
          some feelings.
        </>
      );
    }

    return (
      <div>
        <h2> Current Feelings: </h2>
        {this.props.currentFeelings.map((feeling, i) => (
          <div key={`tag-section-${feeling}`}>
            <h3> {feeling} </h3>
            {this.getTagsForFeeling(feeling)}
          </div>
        ))}
        <h2> All past tags: </h2>
        {this.state.allTags.map((tag, i) => (
          <p key={`past-tag-${i}`}>
            When you were feeling {tag.feeling}, you did this activity: {tag.activity}
          </p>
        ))}
      </div>
    );
  }
}

export default TagsLog;
