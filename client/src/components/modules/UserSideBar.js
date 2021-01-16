import React, { Component } from "react";

import "./UserSideBar.css";

class UserSiderBar extends Component {
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
      <div className="UserSideBar-main">
        Hello, <br /> {this.props.name}
        <p>Feelings:</p>
        <ul className="UserSideBar-feelingsList">
          {this.props.feelings.map((feeling, i) => (
            <li key={i}> {feeling} </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UserSiderBar;
