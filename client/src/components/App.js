import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import IFeelPage from "./pages/IFeelPage.js";
import MainPage from "./pages/MainPage.js";

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
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id, name: user.name, feelings: [] });
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
  };

  setInputtedFeelings = (feelings) => {
    this.setState({ feelings: feelings });
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
            userId={this.state.userId}
            name={this.state.name}
          />
          <MainPage
            path="/main/"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
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
