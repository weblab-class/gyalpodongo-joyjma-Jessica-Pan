import React, { Component } from "react";
import { get, post } from "../../utilities";
import { Link } from "@reach/router";

import "./JournalingPage.css";

// props:
// feelings: current feeling names
// feeling_ids: current feeling ids
class JournalingPage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = { currentEntries: new Array(this.props.feelings.length).fill("") };
  }

  handleTyping = (i, value) => {
    let updatedEntries = this.state.currentEntries;
    updatedEntries[i] = value;
    this.setState({ currentEntry: updatedEntries });
  };

  submit = (index) => {
    console.log(
      "I'm posting this content " +
        this.state.currentEntries[index] +
        " for the feeling " +
        this.props.feelings[index] +
        "(" +
        this.props.feeling_ids +
        ")"
    );
    post("/api/new-note", {
      feeling_id: this.props.feeling_ids[index],
      content: this.state.currentEntries[index],
    });
    this.handleTyping(index, "");
  };

  render() {
    let notLoggedInText = <p> You can view past entries in your profile. </p>;
    if (!this.props.userId) {
      notLoggedInText = (
        <p> Since you're not logged in, your entries won't be saved, but you can still journal! </p>
      );
    }
    let journalingSections = this.props.feelings.map((feeling, i) => (
      <div key={`feeling-journal-section=${i}`}>
        <div className="cloud x2"></div>
        <h3> You said you're feeling {feeling}. Talk about that. </h3>
        <textarea
          placeholder={'Why do you feel "' + feeling + '"?'}
          rows={42}
          cols={21}
          onChange={(event) => this.handleTyping(i, event.target.value)}
          value={this.state.currentEntries[i]}
          className="JournalingPage-input"
        />
        <div className="JournalingPage-buttonDiv">
          <button className="JournalingPage-button" onClick={() => this.submit(i)}>
            Done
          </button>
        </div>
        <div className="cloud x5"></div>
      </div>
    ));
    if (this.props.feelings.length === 0) {
      journalingSections = (
        <>
          You don't have any feelings recorded right now. Click <Link to="/"> here </Link> to list
          some feelings.
          <div>
            <div className="cloudabsolute x2"></div>
            <div className="cloudabsolute x3"></div>
            <div className="cloudabsolute x4"></div>
            <div className="cloudabsolute x5"></div>
          </div>
        </>
      );
    }
    return (
      <div>
        <h2> Here you can journal about your feelings. </h2> Your emotions are valid. Describe why
        you feel that way as comprehensively as you can.
        {notLoggedInText}
        {journalingSections}
        <div>
          <div className="cloudabsolute x2"></div>
          <div className="cloud x3"></div>
        </div>
      </div>
    );
  }
}

export default JournalingPage;
