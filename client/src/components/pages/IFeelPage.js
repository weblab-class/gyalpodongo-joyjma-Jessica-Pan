import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Link } from "@reach/router";
import { motion } from "framer-motion";
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
      choices.splice(offSetArray.slice(-1)[0], 1);
      if (i === 10) {
        choices.splice(0, 1);
      }
      offSetArray.push(choices[Math.floor(Math.random() * choices.length)]);
    }
    console.log(offSetArray);
    this.state = {
      feelings: [],
      currentInput: "",
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
    // console.log("I'm looking at " + feeling);
    // console.log(this.state.feelings);
    // console.log(this.state.feelings.includes(feeling));
    // console.log(typeof this.state.feelings[0]);
    // console.log(typeof feeling);
    if (!this.state.feelings.includes(feeling)) {
      console.log("I haven't seen it.");
      this.props.setInputtedFeelings(this.state.feelings.concat([feeling]));
    }
    this.setState({
      feelings: this.state.feelings.concat([feeling]),
    });
  };

  submitFeelingsToAPI = () => {
    let currentInputString = this.state.currentInput;
    if (currentInputString !== "") {
      currentInputString =
        currentInputString[0].toUpperCase() + currentInputString.substr(1).toLowerCase();
      this.addFeeling(currentInputString);
    }

    for (let i = 0; i < this.props.feelings.length; i++) {
      console.log(`I'm posting ${this.props.feelings[i]}`);
      post("/api/feeling", { feeling_name: this.props.feelings[i] });
    }
  };

  removeFeeling = (feelingName) => {
    let currentFeelings = this.state.feelings;
    const index = currentFeelings.indexOf(feelingName);
    if (index === currentFeelings.lastIndexOf(feelingName)) {
      this.props.removeFeeling(feelingName);
    }
    currentFeelings.splice(index, 1);
    this.setState({
      feelings: currentFeelings,
    });
  };

  render() {
    // console.log(this.state.feelings);
    let yourFeelings = this.state.feelings.map((feeling, i) => (
      <div
        key={`feelings-prop-${i}`}
        className="yourFeelings"
        onClick={() => this.removeFeeling(feeling)}
      >
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
        <div className="IFeelPage-moveUp">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                scale: 0.8,
                opacity: 0,
              },
              visible: {
                scale: 1,
                opacity: 1,
                transition: {
                  delay: 0.5,
                },
              },
            }}
          >
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
              <>
                <h2 className="center"> How are you feeling? </h2>
              </>
            ) : (
              <>
                <h2 className="center">You're feeling:</h2>
                <div className="yourFeelingsBubblesDiv">{yourFeelings}</div>
              </>
            )}
          </motion.div>
          <motion.div
            className="center"
            whileHover={{
              scale: 1.1,
              transition: {
                duration: 0.2,
              },
            }}
          >
            <Link className="IFeelPage-done_button" onClick={this.submitFeelingsToAPI} to="/main/">
              Done
            </Link>
          </motion.div>
        </div>
        <div>
          <div className="cloudabsolute x2"></div>
          <div className="cloudabsolute x3"></div>
          <div className="cloud x4"></div>
          <div className="cloud x5"></div>
        </div>
        <div className="u-fullWidth"> {feelingBubbles}</div>
      </>
    );
  }
}

export default IFeelPage;
