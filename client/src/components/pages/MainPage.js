import React, { Component } from "react";
import { Link } from "@reach/router";
import UserSideBar from "../modules/UserSideBar.js";
import NavBar from "../modules/NavBar.js";
import TagOthers from "./TagOthers.js";
import YourTagsPage from "../modules/YourTagsPage.js";
import FeelingsLog from "../modules/FeelingsLog.js";

import "../../utilities.css";
import "./MainPage.css";

import { get, post } from "../../utilities";

// props:
// feelings: a list of strings
// name: the name of the user
// user id: the ID of the user
class MainPage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = { showing: "Your Tags", feelings: this.props.feelings };
  }

  componentDidMount() {
    console.log("getting the feelings");

    get("/api/feelings").then((response) => {
      console.log("FOUND THE FEELINGS");
      console.log(response);
      const lastTimeStamp = Date.parse(response[response.length - 1].timestamp);
      console.log(lastTimeStamp);
      console.log(typeof lastTimeStamp);
      console.log(new Date());
      console.log(new Date() - lastTimeStamp);

      if (this.props.feelings.length === 0) {
        let currentFeelings = [];
        if (new Date() - lastTimeStamp < 3600000) {
          console.log("HERE");
          console.log(Date.parse(response[0].timestamp));
          console.log(typeof Date.parse(response[0].timestamp));
          console.log(lastTimeStamp);

          console.log(typeof lastTimeStamp);
          console.log(Date.parse(response[0].timestamp) === lastTimeStamp);
          currentFeelings = response
            .filter((singleFeeling) => {
              return Date.parse(singleFeeling.timestamp) === lastTimeStamp;
            })
            .map((singleFeeling) => {
              return singleFeeling.feeling_name;
            });
        }
        console.log(currentFeelings);

        this.setState({ allFeelings: response, feelings: currentFeelings });
      } else {
        this.setState({ allFeelings: response });
      }
    });
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
      mainContent = <YourTagsPage feelings={this.state.feelings} userId={this.props.userId} />;
    } else if (this.state.showing === "Tag Others") {
      mainContent = <TagOthers id={this.props.userId} />;
    } else if (this.state.showing === "Feelings Log") {
      mainContent = (
        <FeelingsLog
          userid={this.props.userId}
          feelingsList={this.state.allFeelings}
          currentFeelings={this.props.feelings}
        />
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
