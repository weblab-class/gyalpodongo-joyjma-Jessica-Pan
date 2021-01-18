import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Link } from "@reach/router";

import FeelingBubble from "../modules/FeelingBubble.js";

import "../../utilities.css";
import "./IFeelPage.css";

import { get, post } from "../../utilities.js";

const GOOGLE_CLIENT_ID = "972905731956-ea88oeb11o2aso89a2mmoh18uhe6oupg.apps.googleusercontent.com";
class IFeelPage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = { feelings: [], bubbles: ["Happy", "Tired", "Anxious", "Sad","Excited","Adventorous",""] };
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  handleTyping = (event) => {
    let key = event.keyCode || event.which;
    if (key === 13) {
      event.preventDefault();
      let finalString = event.target.value;
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
    for (let i = 0; i < this.state.feelings.length; i++) {
      console.log(`I'm posting ${this.state.feelings[i]}`);
      post("/api/feeling", { feeling_name: this.state.feelings[i] });
    }
  };

  render() {
    console.log(this.state.feelings);
    let yourFeelings = this.state.feelings.map((feeling, i) => (
      <p key={`feelings-prop-${i}`}> {feeling} </p>
    ));
    console.log(yourFeelings);
    console.log(this.state.bubbles);
    // let feelingBubbles = this.state.bubbles.map((feeling, i) => (
    //   <p key={`feelings-prop-${i}`}> {feeling} </p>
    // ));
    // console.log(feelingBubbles);
    let feelingBubbles = this.state.bubbles.map((feeling, i) => (
      <FeelingBubble key={`feeling-bubble-${i}`} addFeeling={this.addFeeling} feeling={feeling} />
    ));
    console.log(feelingBubbles);
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
          <input className="textbox" type="text" onKeyPress={this.handleTyping} />
        </span>
        <h2> You're feeling: </h2>
        {yourFeelings}
        <div> {feelingBubbles}</div>
        <div text-align="center">
          <Link className="IFeelPage-done_button" onClick={this.submitFeelingsToAPI} to="/main/">
            Complete
          </Link>
        </div>
      </>
    );
  }
}

export default IFeelPage;
