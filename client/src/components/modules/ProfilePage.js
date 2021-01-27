import React, { Component } from "react";
import { Link } from "@reach/router";

import { get, post } from "../../utilities";

import "./ProfilePage.css";

// props:
// userId: the user id
// name: the user's name
// showFeelingsLog
// showTagsLog
// showTagOthers

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      feelingsLogged: this.props.numLoggedFeelings,
      tagsDone: 0,
      tagsCreated: 0,
      allTags: [],
      ratings: [0, 0, 0, 0, 0],
      loaded: false,
    };
  }

  componentDidMount() {
    let promise1 = get("/api/user", { userid: this.props.userId });
    console.log(this.props.userId);
    let promise2 = get("/api/tagsFromID", { user_id: this.props.userId });
    Promise.all([promise1, promise2]).then((results) => {
      let totalRatings = [0, 0, 0, 0, 0];
      console.log(results[1]);
      for (let i = 0; i < results[1].length; i++) {
        let ratings = results[1][i].ratings;
        if (ratings.length !== 0) {
          console.log(ratings);
          console.log(totalRatings);
          for (let j = 0; j < 5; j++) {
            totalRatings[j] += ratings[j];
          }
        }
      }
      this.setState({
        feelingsLogged: this.state.feelingsLogged,
        tagsDone: results[0].tags.length,
        tagsCreated: results[1].length,
        allTags: results[1],
        ratings: totalRatings,
        loaded: true,
      });
    });
  }

  getAverage = (ratings) => {
    let total = 0;
    let numRatings = 0;
    for (let i = 0; i < ratings.length; i++) {
      total += (i + 1) * ratings[i];
      numRatings += ratings[i];
    }
    return (total / numRatings).toFixed(3);
  };

  render() {
    const pointsPerRating = [0, 1, 2, 4, 8];
    // [points per feeling logged, points per tag done, points per tag created]
    const pointsPerOther = [1, 3, 1];
    let points = 0;

    const pointsPerYourOther = [
      pointsPerOther[0] * this.state.feelingsLogged,
      pointsPerOther[1] * this.state.tagsDone,
      pointsPerOther[2] * this.state.tagsCreated,
    ];

    for (let i = 0; i < pointsPerYourOther.length; i++) {
      points += pointsPerYourOther[i];
    }
    let ratingsPoints = 0;
    const pointsPerYourRatings = this.state.ratings.map((score, i) => score * pointsPerRating[i]);
    console.log(pointsPerYourRatings);
    for (let i = 0; i < pointsPerYourRatings.length; i++) {
      points += pointsPerYourRatings[i];
      ratingsPoints += pointsPerYourRatings[i];
    }

    let currentFeelings;
    if (this.props.feelings.length !== 0) {
      currentFeelings = <p> Right now you're feeling {this.props.feelings.join(", ")} </p>;
    }

    let userInfo = <> Loading... </>;
    if (this.state.loaded) {
      userInfo = (
        <>
          <span className="ProfilePage-PointsSpan">
            <h1> Points: {points} </h1>
            <span className="ProfilePage-subScore ProfilePage-hidesWhenThin">
              ={pointsPerYourOther.concat(pointsPerYourRatings).join("+")}
            </span>
          </span>
          <span className="ProfilePage-mainInfoBox">
            <span className="ProfilePage-infoSection">
              <span>
                You've logged {this.state.feelingsLogged} feelings ({pointsPerYourOther[0]})
              </span>
              <span>
                You've done {this.state.tagsDone} tags ({pointsPerYourOther[1]})
              </span>
            </span>
            <span className="ProfilePage-infoSection">
              <span>
                You've created {this.state.tagsCreated} tags. ({pointsPerYourOther[2]})
              </span>
              <span>
                Average tag rating: {this.getAverage(this.state.ratings)}
                <span className="ProfilePage-showsWhenThin"> ({ratingsPoints}) </span>
              </span>
            </span>
            <span className="ProfilePage-infoSection">
              <span className="ProfilePage-smallStats ProfilePage-hidesWhenThin">
                {this.state.ratings.map((value, i) => (
                  <span key={`profile-stats-${i}`}>
                    {i + 1}-star ratings: {value} ({pointsPerYourRatings[i]})
                  </span>
                ))}
              </span>
            </span>
          </span>
        </>
      );
    }
    return (
      <div>
        <div className="ProfilePage-wholeDiv">
          <h2> Hello, {this.props.name} </h2>
          {currentFeelings}
          <div className="ProfilePage-userScoreDiv">{userInfo}</div>
          <button className="ProfilePage-button" onClick={this.props.showFeelingsLog}>
            Past Feelings
          </button>
          <button
            className="ProfilePage-button"
            onClick={() => this.props.showTagsLog(this.state.allTags)}
          >
            Past Tags Done
          </button>
          <button className="ProfilePage-button" onClick={this.props.showTagOthers}>
            Past Tags Created
          </button>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
