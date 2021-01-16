import React, { Component } from "react";
import { post } from "../../utilities";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./NewTagInput.css";

class NewTagInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      valueFeeling: "",
    };
  }

  // called whenever the user types in the new post input box
  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };
  handleChangeFeeling = (event) => {
    this.setState({
      valueFeeling: event.target.value,
    });
  };

  // called when the user hits "Submit" for a new post
  handleSubmit = (event) => {
    event.preventDefault();
    post("/api/tag", {
      activity: this.state.value,
      feeling: this.state.valueFeeling,
    });
    this.props.onSubmit();

    // this.setState({
    //   value: "",
    //   valueFeeling: "",
    // });
  };

  render() {
    return (
      <div className="u-flex NewTagInput-container">
        <input
          type="text"
          placeholder={"Type activity here"}
          value={this.state.value}
          onChange={this.handleChange}
          className="NewTagInput-input"
        />
        <input
          type="text"
          placeholder={"Type activity feeling"}
          value={this.state.valueFeeling}
          onChange={this.handleChangeFeeling}
          className="NewTagInput-input"
        />
        <button
          type="submit"
          className="NewTagInput-button u-pointer"
          value="Submit"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default NewTagInput;
