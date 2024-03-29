import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import IFeelPage from "./pages/IFeelPage.js";
import MainPage from "./pages/MainPage.js";
import {motion} from "framer-motion";
import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      name: undefined,
      feelings: [],
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id, name: user.name });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    let promise2;
    const promise1 = post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id, name: user.name, feelings: [] });
      promise2 = post("/api/initsocket", { socketid: socket.id }).then((results) => {
        console.log("finished logging in");
      });
    });
    return [promise1, promise2];
  };

  handleLogout = () => {
    this.setState({ userId: undefined, name: undefined });
    post("/api/logout");
  };

  setInputtedFeelings = (feelings) => {
    this.setState({ feelings: feelings });
  };

  removeFeeling = (feelingName) => {
    let currentFeelings = this.state.feelings;
    currentFeelings.splice(currentFeelings.indexOf(feelingName), 1);
    this.setState({
      feelings: currentFeelings,
    });
  };

  render() {
    return (
      <>
        <Router>
          <IFeelPage
            path="/"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            setInputtedFeelings={this.setInputtedFeelings}
            removeFeeling={this.removeFeeling}
            feelings={this.state.feelings}
            userId={this.state.userId}
            name={this.state.name}
          />
          <MainPage
            className="u-fullHeight"
            path="/main/"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            setInputtedFeelings={this.setInputtedFeelings}
            userId={this.state.userId}
            feelings={this.state.feelings}
            name={this.state.name}
          />
          <NotFound default />
        </Router>
      </>
    );
  }
}

export default App;
