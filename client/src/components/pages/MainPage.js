import React, { Component } from "react";
import { Link } from "@reach/router";
import UserSideBar from "../modules/UserSideBar.js";
import NavBar from "../modules/NavBar.js";

import "../../utilities.css";
import "./MainPage.css";

// props:
// feelings: a list of strings
// name: the name of the user
// user id: the ID of the user
class MainPage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = { showing: "Your Tags" };
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  showYourTags = () => {
    this.setState({ showing: "Your Tags" });
  };

  showTagOthers = () => {
    this.setState({ showing: "Tag Others" });
  };

  render() {
    let mainContent;
    if (this.state.showing === "Your Tags") {
      mainContent = <p> YOUR TAGS </p>;
    } else if (this.state.showing === "Tag Others") {
      mainContent = <p> TAG OTHERS </p>;
    }

    return (
      <>
        <NavBar
          handleLogout={this.props.handleLogout}
          handleLogin={this.props.handleLogin}
          userId={this.props.userId}
          showYourTags={this.showYourTags}
          showTagOthers={this.showTagOthers}
        />
        <span className="MainPage-main">
          <UserSideBar name={this.props.name} feelings={this.props.feelings} />
          <div className="MainPage-mainContent">{mainContent}</div>
        </span>
      </>
    );
  }
}

export default MainPage;
