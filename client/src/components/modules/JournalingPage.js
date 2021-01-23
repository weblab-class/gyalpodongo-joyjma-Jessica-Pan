import React, { Component } from "react";
import { get, post } from "../../utilities";

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
        this.props.feelings[index]
    );
    post("/api/new-note", {
      feeling_id: this.props.feeling_ids[index],
      content: this.state.currentEntries[index],
    });
  };

  render() {
    return (
      <div>
        <h2> This is where you can journal about your feelings. </h2> Your emotions are valid.
        Describe why you feel that way as comprehensively as you can.
        {this.props.feelings.map((feeling, i) => (
          <div key={`feeling-journal-section=${i}`}>
            <h3> You said you're feeling {feeling}. Talk about that. </h3>
            <input
              className="JournalingPage-textBox"
              type="text"
              onKeyPress={(event) => this.handleTyping(i, event.target.value)}
            />
            <button onClick={() => this.submit(i)}> Done </button>
          </div>
        ))}
      </div>
    );
  }
}

export default JournalingPage;
