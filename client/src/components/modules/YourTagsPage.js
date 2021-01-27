import React, { Component } from "react";
import FeeelingSection from "./FeeelingSection.js";
import { Link } from "@reach/router";

import "./YourTagsPage.css";

class YourTagsPage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    let noFeelingsText;
    if (this.props.feelings.length === 0) {
      noFeelingsText = (
        <div>
          <span>
            You don't have any feelings recorded right now. Click <Link to="/"> here </Link> to list
            some feelings.
          </span>
          <div>
            <div className="cloudabsolute x2"></div>
            <div className="cloudabsolute x3"></div>
            <div className="cloudabsolute x5"></div>
            <div className="cloudabsolute x4"></div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="cloudabsolute x2"></div>
        <div className="cloudabsolute x3"></div>
        <div className="YourTagsPage-container">
          <h2> Here you get suggested activities based on your emotions. </h2>
          <p> This includes both tags you've created and tags created by others. </p>
          {noFeelingsText}
          {this.props.feelings.map((feeling, i) => (
            <>
              <FeeelingSection
                key={`feeling-${i}`}
                feeling={feeling}
                userId={this.props.userId}
                tagToHTML={this.props.tagToHTML}
                showTagOthers={this.props.showTagOthers}
              />
              <div className="cloud x2"></div>
            </>
          ))}
        </div>
      </div>
    );
  }
}

export default YourTagsPage;
