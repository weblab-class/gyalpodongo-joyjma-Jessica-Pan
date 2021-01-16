/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

//import models
const Tag = require("./models/tag");
const Feeling = require("./models/feeling");

//get user. copy pasted from api.js in catbook
router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.post("/feeling", auth.ensureLoggedIn, (req, res) => {
  console.log(
    `received feeling input from  ${req.user.name} (${req.user.id}): ${req.body.feeling_name}`
  );
  const newFeeling = new Feeling({
    feeling_name: req.body.feeling_name,
    user_id: req.user.id,
  });
  newFeeling.save();
});

router.get("/feelings", auth.ensureLoggedIn, (req, res) => {
  Feeling.find({
    user_id: req.user.id,
  }).then((feelings) => {
    res.send(feelings);
  });
});

router.get("/tags", (req, res) => {
  console.log(`getting tags with feeling ${req.query.feeling}`);
  Tag.find({}).then((results) => {
    console.log("ALL TAGS:");
    console.log(results);
  });
  Tag.find({
    feeling: req.query.feeling,
  }).then((feelings) => {
    res.send(feelings);
  });
});

router.post("/tag", auth.ensureLoggedIn, (req, res) => {
  const newTag = new Tag({
    tag_id: `${req.user.id}${Date.now}`, //each tag has a unique id: combo of user id and timestamp
    activity: req.body.activity,
    feeling: req.body.feeling, //Array of Strings, each String is a feeling
    original_poster: req.user.id,
  });
  newTag.save();
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({
    msg: "API route not found",
  });
});

module.exports = router;
