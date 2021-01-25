import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Link } from "@reach/router";

import FeelingBubble from "../modules/FeelingBubble.js";

import "../../utilities.css";
import "./IFeelPage.css";
import "../modules/FeelingBubble.css";

import { get, post } from "../../utilities.js";

const GOOGLE_CLIENT_ID = "972905731956-ea88oeb11o2aso89a2mmoh18uhe6oupg.apps.googleusercontent.com";
class IFeelPage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    let offSetArray = [0];
    for (let i = 0; i < 11; i++) {
      const choices = [...Array(7).keys()];
      choices.splice(offSetArray[-1], 1);
      offSetArray.push(choices[Math.floor(Math.random() * choices.length)]);
    }
    console.log(offSetArray);
    this.state = {
      feelings: [],
      currentInput: "",
      bubbles: ["Happy", "Tired", "Anxious", "Sad", "Excited", "Adventorous", "Overwhelmed"],
      offset: offSetArray,
    };
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  handleTyping = (event) => {
    let key = event.keyCode || event.which;
    if (key === 13) {
      event.preventDefault();
      let finalString = event.target.value.trim();
      finalString = finalString[0].toUpperCase() + finalString.substr(1).toLowerCase();
      this.addFeeling(finalString);
      event.target.value = "";
    }
  };

  addFeeling = (feeling) => {
    this.props.setInputtedFeelings(this.state.feelings.concat([feeling]));
    this.setState({
      feelings: this.state.feelings.concat([feeling]),
    });
  };

  submitFeelingsToAPI = () => {
    let currentInputString = this.state.currentInput;
    currentInputString =
      currentInputString[0].toUpperCase() + currentInputString.substr(1).toLowerCase();
    this.addFeeling(currentInputString);

    for (let i = 0; i < this.state.feelings.length; i++) {
      console.log(`I'm posting ${this.state.feelings[i]}`);
      post("/api/feeling", { feeling_name: this.state.feelings[i] });
    }
  };

  render() {
    // console.log(this.state.feelings);
    let yourFeelings = this.state.feelings.map((feeling, i) => (
      <div key={`feelings-prop-${i}`} className="yourFeelings">
        {feeling}
      </div>
    ));
    // console.log(yourFeelings);
    let feelingBubbles = new Array(12)
      .fill(0)
      .map((feeling, i) => (
        <FeelingBubble
          key={`feeling-bubble-${i}`}
          addFeeling={this.addFeeling}
          index={i}
          offset={this.state.offset[i]}
        />
      ));
    // console.log(feelingBubbles);
    return (
      <>
        {this.props.userId ? (
          <GoogleLogout
            className="GoogleButton"
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.props.handleLogout}
            onFailure={(err) => console.log(err)}
          />
        ) : (
          <GoogleLogin
            className="GoogleButton"
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.props.handleLogin}
            onFailure={(err) => console.log(err)}
          />
        )}
        {this.props.name === undefined ? <> </> : <> Hello, {this.props.name} </>}
        <span className="IFeelSpan">
          I feel
          <input
            className="textbox"
            type="text"
            onChange={(event) => this.setState({ currentInput: event.target.value })}
            onKeyPress={this.handleTyping}
          />
        </span>
        {this.state.feelings.length === 0 ? (
          <div> </div>
        ) : (
          <>
            <h2 className="center">You're feeling:</h2>
            <div className="yourFeelingsBubblesDiv">{yourFeelings}</div>
          </>
        )}
        <div className="center">
          <Link className="IFeelPage-done_button" onClick={this.submitFeelingsToAPI} to="/main/">
            Complete
          </Link>
        </div>
        <div className="u-fullWidth test"> {feelingBubbles}</div>
      </>
    );
  }
}

export default IFeelPage;
