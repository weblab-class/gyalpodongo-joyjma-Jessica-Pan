import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Link } from "@reach/router";

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
    let pastFeelingsSection;
    if (this.props.userId) {
      pastFeelingsSection = (
        <span className="NavBar-link u-inlineBlock" onClick={this.props.showFeelingsLog}>
          Past Feelings
        </span>
      );
    }

    return (
      <nav className="NavBar-container">
        <div className="NavBar-container">
          {this.props.userId ? (
            <div className="NavBar-link NavBar-login u-inlineBlock right">
              <GoogleLogout
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={this.props.handleLogout}
                onFailure={(err) => console.log(err)}
              />
            </div>
          ) : (
            <div className="NavBar-link NavBar-login u-inlineBlock right">
              <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={this.props.handleLogin}
                onFailure={(err) => console.log(err)}
              />
            </div>
          )}

          <span className="NavBar-link u-inlineBlock" onClick={this.props.showYourTags}>
            Your tags
          </span>
          <span className="NavBar-link u-inlineBlock" onClick={this.props.showTagOthers}>
            Tag Others
          </span>
          <Link className="NavBar-link u-inlineBlock" to="/">
            Input Feelings
          </Link>
          {pastFeelingsSection}
        </div>
      </nav>
    );
  }
}

export default NavBar;
