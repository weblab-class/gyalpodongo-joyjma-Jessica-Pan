import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";

const GOOGLE_CLIENT_ID = "972905731956-ea88oeb11o2aso89a2mmoh18uhe6oupg.apps.googleusercontent.com";

class NavBar extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
      <div className="NavBar-main">
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
        <span className="NavBar-section" onClick={this.props.showYourTags}>
          your tags
        </span>
        <span className="NavBar-section" onClick={this.props.showTagOthers}>
          tag others
        </span>
      </div>
    );
  }
}

export default NavBar;
