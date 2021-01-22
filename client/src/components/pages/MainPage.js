import React, { Component } from "react";
import { Link } from "@reach/router";
import UserSideBar from "../modules/UserSideBar.js";
import NavBar from "../modules/NavBar.js";
import TagOthers from "./TagOthers.js";
import YourTagsPage from "../modules/YourTagsPage.js";
import FeelingsLog from "../modules/FeelingsLog.js";
import TagsLog from "../modules/TagsLog.js";

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
    this.state = { showing: "Your Tags", feelings: this.props.feelings, allFeelings: [] };
  }

  componentDidMount() {
    console.log("getting the feelings");
    this.getAllPastFeelings();
  }

  getAllPastFeelings = () => {
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
          currentFeelings = response
            .filter((singleFeeling) => {
              console.log(Date.parse(singleFeeling.timestamp) - lastTimeStamp);
              return lastTimeStamp - Date.parse(singleFeeling.timestamp) < 3000;
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
  };

  handleLoginIntermediate = (res) => {
    let x = this.props.handleLogin(res);
    Promise.all([x]).then((results) => {
      console.log("1");
      for (let i = 0; i < this.state.feelings.length; i++) {
        console.log(`I'm posting ${this.state.feelings[i]}`);
        post("/api/feeling", { feeling_name: this.state.feelings[i] });
      }
      console.log("2");
      this.getAllPastFeelings();
    });
  };

  showYourTags = () => {
    this.setState({ showing: "Your Tags" });
  };

  showTagOthers = () => {
    this.setState({ showing: "Tag Others" });
  };

  showFeelingsLog = () => {
    this.setState({ showing: "Feelings Log" });
  };

  showTagsLog = () => {
    this.setState({ showing: "Tags Log" });
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
          currentFeelings={this.state.feelings}
        />
      );
    } else if (this.state.showing === "Tags Log") {
      mainContent = <TagsLog userId={this.props.userId} currentFeelings={this.state.feelings} />;
    }

    return (
      <div className="u-fullHeight">
        <NavBar
          handleLogout={this.props.handleLogout}
          handleLogin={this.handleLoginIntermediate}
          userId={this.props.userId}
          showYourTags={this.showYourTags}
          showTagOthers={this.showTagOthers}
          showFeelingsLog={this.showFeelingsLog}
          showTagsLog={this.showTagsLog}
        />
        <span className="MainPage-main">
          <UserSideBar name={this.props.name} feelings={this.state.feelings} />
          <div className="MainPage-mainContent">{mainContent}</div>
        </span>
      </div>
    );
  }
}

export default MainPage;
