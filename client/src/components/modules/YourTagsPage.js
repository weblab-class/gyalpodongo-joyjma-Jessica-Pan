import React, { Component } from "react";
import FeeelingSection from "./FeeelingSection.js";
import { Link } from "@reach/router";

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
        <>
          You don't have any feelings recorded today. Click <Link to="/"> here </Link> to list some
          feelings.
        </>
      );
    }
    return (
      <div>
        <h1> This is the your tags page</h1>
        {noFeelingsText}
        {this.props.feelings.map((feeling, i) => (
          <FeeelingSection key={`feeling-${i}`} feeling={feeling} userId={this.props.userId} />
        ))}
      </div>
    );
  }
}

export default YourTagsPage;
