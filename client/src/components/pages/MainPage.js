import React, { Component } from "react";
import { Link } from "@reach/router";
import UserSideBar from "../modules/UserSideBar.js";
import NavBar from "../modules/NavBar.js";
import YourTagsPage from "../modules/YourTagsPage.js";
import FeelingsLog from "../modules/Feelingslog.js";

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

  showFeelingsLog = () => {
    this.setState({ showing: "Feelings Log" });
  };

  render() {
    let mainContent;
    if (this.state.showing === "Your Tags") {
      mainContent = <YourTagsPage feelings={this.props.feelings} />;
    } else if (this.state.showing === "Tag Others") {
      mainContent = <p> TAG OTHERS </p>;
    } else if (this.state.showing === "Feelings Log") {
      mainContent = (
        <FeelingsLog userid={this.props.userId} currentFeelings={this.props.feelings} />
      );
    }

    return (
      <>
        <NavBar
          handleLogout={this.props.handleLogout}
          handleLogin={this.props.handleLogin}
          userId={this.props.userId}
          showYourTags={this.showYourTags}
          showTagOthers={this.showTagOthers}
          showFeelingsLog={this.showFeelingsLog}
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
