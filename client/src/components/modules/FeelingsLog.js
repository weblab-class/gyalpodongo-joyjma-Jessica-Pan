import React, { Component } from "react";
import { Link } from "@reach/router";

import { get, post } from "../../utilities";

import "./FeelingsLog.css";

// props:
// userId: the user id
// currentFeelings: the current feelings
class FeelingsLog extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = { allFeelings: this.props.feelingsList, notes: [] };
  }

  componentDidMount() {
    // remember -- api calls go here!
    if (this.state.allFeelings === []) {
      get("/api/feelings").then((response) => {
        console.log(response);
        console.log(response.reverse());
        this.setState({ allFeelings: response });
      });
    }
    console.log("I'm gonna find the notes");
    get("/api/notes").then((response) => {
      this.setState({ notes: response });
      console.log("I found these notes: ");
      console.log(response);
    });
  }

  getNotesFor = (feeling_id) => {
    const relevantNotes = this.state.notes.filter((note) => {
      return note.feeling_id === feeling_id;
    });
    return (
      <>
        {relevantNotes.map((note) => (
          <p key={note._id} className="FeelingLog-note">
            {"\t" + note.content}
          </p>
        ))}
      </>
    );
  };

  render() {
    console.log(this.state.allFeelings);
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
        This is a log of all of your past feelings:
        <h2> Current Emotions: </h2>
        {currentFeelings}
        <h2> Past feelings: </h2>
        {this.state.allFeelings.map((feeling, i) => (
          <div key={`past-list-${i}`}>
            <h3>
              You felt {feeling.feeling_name} on {feeling.timestamp}.
            </h3>
            {this.getNotesFor(feeling._id)}
          </div>
        ))}
      </div>
    );
  }
}

export default FeelingsLog;
