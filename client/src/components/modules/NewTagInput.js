import React, { Component } from "react";
import { post } from "../../utilities";

import "../../utilities.css";
import "./NewTagInput.css";

class NewTagInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      valueFeeling: "",
      showLink: false,
      linkInput: "",
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
  handleChangeLink = (event) => {
    this.setState({ linkInput: event.target.value });
  };

  showLink = () => {
    this.setState({ showLink: !this.state.showLink });
  };

  // called when the user hits "Submit" for a new post
  handleSubmit = (event) => {
    event.preventDefault();
    let valueFeelingCamel = this.state.valueFeeling;
    valueFeelingCamel =
      valueFeelingCamel[0].toUpperCase() + valueFeelingCamel.substr(1).toLowerCase();
    let activityText = this.state.value;
    if (this.state.showLink && this.state.linkInput !== "") {
      activityText += "|||" + this.state.linkInput;
    }
    const newTag = {
      activity: activityText,
      feeling: valueFeelingCamel,
    };
    post("/api/tag", newTag);
    this.props.onSubmit();

    this.setState({
      value: "",
      valueFeeling: "",
    });
  };

  render() {
    let link_input = "";
    let checked = "\u2610";
    if (this.state.showLink) {
      link_input = (
        <input
          type="text"
          placeholder={"link"}
          onChange={this.handleChangeLink}
          className="NewTagInput-input"
        />
      );
      checked = "\u2713";
    }
    return (
      <div className="NewTagInput-container">
        <p> I suggest that someone feeling this way: </p>
        <input
          type="text"
          placeholder={"feeling"}
          onChange={this.handleChangeFeeling}
          value={this.state.valueFeeling}
          className="NewTagInput-input"
        />
        <p> could do the following: </p>
        <textarea
          placeholder={"activity"}
          rows={25}
          cols={10}
          onChange={this.handleChange}
          value={this.state.value}
          className="NewTagInput-activityInput"
        />
        <p>
          <label className="NewTagInput-label">
            <input type="checkbox" onChange={this.showLink} />
            {checked} Include Link
          </label>
        </p>
        {link_input}
        <div className="NewTagInput-buttonDiv">
          <button
            type="submit"
            className="NewTagInput-button u-pointer"
            value="Submit"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default NewTagInput;
