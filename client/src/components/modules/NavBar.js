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

  shouldBeUnderlined(classNames, index) {
    console.log(this.props.showingIndex);
    if (index === this.props.showingIndex) {
      console.log("here");
      return classNames + " NavBar-underlined";
    } else {
      return classNames;
    }
  }

  render() {
    let pastFeelingsSection;
    let hello = "Hello.";
    let tagOthersSection;
    if (this.props.userId) {
      pastFeelingsSection = (
        <span
          className={this.shouldBeUnderlined("NavBar-link u-inlineBlock", 4)}
          onClick={this.props.showProfilePage}
        >
          Your Profile
        </span>
      );
      tagOthersSection = (
        <span
          className={this.shouldBeUnderlined("NavBar-link u-inlineBlock", 2)}
          onClick={this.props.showTagOthers}
        >
          Tag Others
        </span>
      );
      hello = "Hello, " + this.props.name;
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
          <Link className="NavBar-link u-inlineBlock" to="/">
            I feel <div className="NavBar-iFeelBox" />
          </Link>
          <span
            className={this.shouldBeUnderlined("NavBar-link u-inlineBlock", 1)}
            onClick={this.props.showYourTags}
          >
            Your Tags
          </span>
          {tagOthersSection}
          <span
            className={this.shouldBeUnderlined("NavBar-link u-inlineBlock", 3)}
            onClick={this.props.showJournaling}
          >
            Journal
          </span>
          {pastFeelingsSection}
        </div>
        <span className="NavBar-hello">{hello}</span>
      </nav>
    );
  }
}

export default NavBar;
