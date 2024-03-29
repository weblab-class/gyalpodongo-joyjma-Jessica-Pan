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
        <h2> Here you can view a log of your past feelings. </h2>
        <h1> Current Emotions: </h1>
        {currentFeelings}
        <h1> Past feelings: </h1>
        {this.state.allFeelings.map((feeling, i) => (
          <div key={`past-list-${i}`}>
            <h3>
              You felt {this.state.allFeelings[this.state.allFeelings.length - i - 1].feeling_name}{" "}
              on {this.state.allFeelings[this.state.allFeelings.length - i - 1].timestamp}.
            </h3>
            {this.getNotesFor(this.state.allFeelings[this.state.allFeelings.length - i - 1]._id)}
          </div>
        ))}
      </div>
    );
  }
}

export default FeelingsLog;
