import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./IFeelPage.css";

const GOOGLE_CLIENT_ID = "972905731956-ea88oeb11o2aso89a2mmoh18uhe6oupg.apps.googleusercontent.com";
class IFeelPage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {feelings: []};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  handleTyping = (event) => {
    let key = event.keyCode || event.which;
    if(key === 13){
      event.preventDefault();
      let finalString = event.target.value;
      finalString = finalString[0].toUpperCase() + finalString.substring(1).toLowerCase()
      event.target.value = "";
      this.props.setInputtedFeelings(this.state.feelings.concat([finalString]));
      this.setState({
        feelings: this.state.feelings.concat([finalString])
      });
    }
  }

  render() {
    let yourFeelings = this.state.feelings.map((feeling) => 
      <p> {feeling} </p>
    );
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
        <span className="IFeelSpan">
          I feel
          <input
          className = "textbox"
          type="text"
          onKeyPress={this.handleTyping}
          />
        </span>
        <h2> You're feeling: </h2>
        {yourFeelings}
        <div>
          <Link className="IFeelPage-done_button" to="/main/"> Done </Link>
        </div>
      </>
    );
  }
}

export default IFeelPage;
