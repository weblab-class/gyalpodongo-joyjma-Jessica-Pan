import React, { Component } from "react";
import { Link } from "@reach/router";
import UserSideBar from "../modules/UserSideBar.js";
import NavBar from "../modules/NavBar.js";
import TagOthers from "./TagOthers.js";
import YourTagsPage from "../modules/YourTagsPage.js";
import FeelingsLog from "../modules/FeelingsLog.js";
import TagsLog from "../modules/TagsLog.js";
import JournalingPage from "../modules/JournalingPage.js";
import { motion } from "framer-motion";

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
    this.state = {
      mainContent: "Loading...",
      feelings: this.props.feelings,
      allFeelings: [],
      feeling_ids: [],
    };
  }

  componentDidMount() {
    console.log("getting the feelings");
    this.getAllPastFeelings();
    this.showYourTags();
  }

  getAllPastFeelings = () => {
    get("/api/feelings").then((response) => {
      console.log("FOUND THE FEELINGS");
      console.log(response);
      const lastTimeStamp = Date.parse(response[response.length - 1].timestamp);

      if (this.props.feelings.length === 0) {
        let currentFeelingNames = [];
        let currentFeelingIDs;
        if (new Date() - lastTimeStamp < 3600000) {
          const currentFeelings = response.filter((singleFeeling) => {
            return lastTimeStamp - Date.parse(singleFeeling.timestamp) < 3000;
          });
          currentFeelingNames = currentFeelings.map((singleFeeling) => {
            return singleFeeling.feeling_name;
          });
          currentFeelingIDs = currentFeelings.map((singleFeeling) => {
            return singleFeeling._id;
          });
        }
        console.log(currentFeelingNames);

        this.setState({
          allFeelings: response,
          feelings: currentFeelingNames,
          feeling_ids: currentFeelingIDs,
        });
        this.props.setInputtedFeelings(currentFeelingNames);
      } else {
        this.setState({ allFeelings: response });
      }
      this.showYourTags();
    });
  };

  handleLoginIntermediate = (res) => {
    let x = this.props.handleLogin(res);
    Promise.all(x).then((results) => {
      console.log("1");
      for (let i = 0; i < this.state.feelings.length; i++) {
        console.log(`I'm posting ${this.state.feelings[i]}`);
        post("/api/feeling", { feeling_name: this.state.feelings[i] });
      }
      console.log("2");
      this.getAllPastFeelings();
    });
  };

  tagToHTML = (tagActivityText) => {
    // tagActivityText is in this form: activity|||link. This program puts in into this form: activity (link)
    console.log("here's the tag: ");
    console.log(tagActivityText);
    const parsedText = tagActivityText.split("|||");
    if (parsedText.length === 1) {
      return <> {parsedText[0]} </>;
    }
    return (
      <>
        {parsedText[0]} (
        <a href={parsedText[1]} target="_blank">
          link
        </a>
        )
      </>
    );
  };

  showYourTags = () => {
    this.setState({
      mainContent: (
        <YourTagsPage
          feelings={this.state.feelings}
          userId={this.props.userId}
          tagToHTML={this.tagToHTML}
          showTagOthers={this.showTagOthers}
        />
      ),
    });
  };

  showTagOthers = () => {
    this.setState({ mainContent: <TagOthers id={this.props.userId} tagToHTML={this.tagToHTML} /> });
  };

  showFeelingsLog = () => {
    this.setState({
      mainContent: (
        <FeelingsLog
          userid={this.props.userId}
          feelingsList={this.state.allFeelings}
          currentFeelings={this.state.feelings}
        />
      ),
    });
  };

  showTagsLog = () => {
    this.setState({
      mainContent: (
        <TagsLog
          userId={this.props.userId}
          currentFeelings={this.state.feelings}
          tagToHTML={this.tagToHTML}
        />
      ),
    });
  };

  showJournaling = () => {
    this.setState({
      mainContent: (
        <JournalingPage
          feelings={this.state.feelings}
          feeling_ids={this.state.feeling_ids}
          userId={this.props.userId}
        />
      ),
    });
  };

  render() {
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
          showJournaling={this.showJournaling}
        />
        <span className="MainPage-main">
          {/* <UserSideBar name={this.props.name} feelings={this.state.feelings} /> */}
          <div className="MainPage-mainContent">{this.state.mainContent}</div>
        </span>
      </div>
    );
  }
}

export default MainPage;
