import React, { Component } from "react";

import "./SingleTag.css";

import { get, post } from "../../utilities";

// props: tag, userId
class SingleTag extends Component {
  constructor(props) {
    super(props);
    const completeMessages = ["Great", "Good job", "You did it", "Congrats", "Proud of you"];
    const punctuation = [".", "!"];
    const completeMessage =
      completeMessages[Math.floor(Math.random() * completeMessages.length)] +
      punctuation[Math.floor(Math.random() * punctuation.length)];
    this.state = { showingComplete: false, stars: 3, completeMessage: completeMessage };
  }

  taskComplete = () => {
    console.log("HEREE ");
    this.setState({ showingComplete: true });
    // post("/api/task-complete", {
    //   tagId: this.props.tag.tag_id,
    //   userId: this.props.userId,
    // });
  };

  submitRating = () => {
    this.setState({ showingComplete: false });
    this.props.removeTag(this.props.tag);
    post("/api/rating", { tagId: this.props.tag.tag_id, rating: this.state.stars });
  };

  setStars = (number) => {
    this.setState({ stars: number });
  };

  render() {
    let completeView;
    if (this.state.showingComplete) {
      completeView = (
        <div className="SingleTag-complete">
          <span className="SingleTag-completeText"> {this.state.completeMessage} </span>
          <span className="SingleTag-buttonHolder">
            <button className="SingleTag-taskCompleteButton" onClick={this.submitRating}>
              Submit Rating
            </button>
          </span>
        </div>
      );
    }
    let endOfBar = (
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
    );
    let stars = [];
    for (let i = 0; i < this.state.stars; i++) {
      stars.push("\u2605");
    }
    for (let i = 0; i < 5 - this.state.stars; i++) {
      stars.push("\u2606");
    }
    if (this.state.showingComplete) {
      endOfBar = (
        <span className="SingleTag-starsSpan">
          {[...Array(5).keys()].map((i) => (
            <span key={`tag-${this.props.tag.tag_id}-${i}`} onClick={() => this.setStars(i + 1)}>
              {stars[i]}
            </span>
          ))}
        </span>
      );
    }
    return (
      <>
        <span className="SingleTag-container">
          <span className="SingleTag-activity">
            {this.props.tagToHTML(this.props.tag.activity)}
          </span>
          {endOfBar}
        </span>
        {completeView}
      </>
    );
  }
}

export default SingleTag;
