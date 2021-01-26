import React, { Component } from "react";
import SingleTag from "./SingleTag.js";

import "./UserSideBar.css";
import "./CreatedTag.css";

import { get, post } from "../../utilities";

class CreatedTag extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = { showingRatings: false };
  }

  showRatings = () => {
    this.setState({ showingRatings: !this.state.showingRatings });
  };

  getStars = (num) => {
    let string = "";
    for (let i = 0; i < num; i++) {
      string += "\u2605";
    }
    for (let i = 0; i < 5 - num; i++) {
      string += "\u2606";
    }
    return string;
  };

  render() {
    let tag = this.props.tag;
    let total = 0;
    for (let i = 0; i < 5; i++) {
      total += tag.ratings[i];
    }
    if (isNaN(total)) {
      total = 0;
    }
    let ratingsView;
    if (this.state.showingRatings) {
      ratingsView = (
        <div className="CreatedTag-ratings">
          {tag.ratings.map((value, i) => (
            <p key={`ratings-view-${i}`}>
              {this.getStars(i + 1)}: {value}
            </p>
          ))}
        </div>
      );
    }
    return (
      <>
        <div className="CreatedTag-container">
          <p className="CreatedTag-feelingName"> {tag.feeling} </p>
          <span className="u-textCenter"> {this.props.tagToHTML(tag.activity)} </span>
          <button className="CreatedTag-button " onClick={this.showRatings}>
            Ratings: {total}{" "}
          </button>
        </div>
        {ratingsView}
      </>
    );
  }
}

export default CreatedTag;
