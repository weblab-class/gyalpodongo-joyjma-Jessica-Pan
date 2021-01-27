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
    this.state = { showingComplete: false, stars: 0, completeMessage: completeMessage };
  }

  taskComplete = () => {
    console.log("HEREE ");
    this.setState({ showingComplete: true });
    post("/api/task-complete", {
      tagId: this.props.tag.tag_id,
      userId: this.props.userId,
    });
  };

  submitRating = () => {
    let rating = this.state.stars;
    if (rating === 0) {
      rating = 1;
    }
    this.nextTag();
    post("/api/rating", { tagId: this.props.tag.tag_id, rating: this.state.stars });
  };

  nextTag = () => {
    this.setState({ showingComplete: false });
    this.props.removeTag(this.props.tag);
  };

  setStars = (number) => {
    this.setState({ stars: number });
  };

  render() {
    let completeView;
    if (this.state.showingComplete && this.props.userId) {
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

    if (this.state.showingComplete) {
      let stars = [];
      for (let i = 0; i < this.state.stars; i++) {
        stars.push("\u2605");
      }
      for (let i = 0; i < 5 - this.state.stars; i++) {
        stars.push("\u2606");
      }
      endOfBar = this.props.userId ? (
        <span className="SingleTag-starsSpan">
          {[...Array(5).keys()].map((i) => (
            <span key={`tag-${this.props.tag.tag_id}-${i}`} onClick={() => this.setStars(i + 1)}>
              {stars[i]}
            </span>
          ))}
        </span>
      ) : (
        <span className="SingleTag-starsSpan"> {this.state.completeMessage} </span>
      );
      if (!this.props.userId) {
        return (
          <>
            <span className="SingleTag-container u-clickable" onClick={this.nextTag}>
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
