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
const Note = require("./models/note");
const tag = require("./models/tag");

//get user. copy pasted from api.js in catbook
router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.post("/feeling", auth.ensureLoggedIn, (req, res) => {
  console.log(
    `received feeling input from  ${req.user.name} (${req.user._id}): ${req.body.feeling_name}`
  );
  const currentTime = new Date().toLocaleString();
  console.log(currentTime);
  const newFeeling = new Feeling({
    feeling_name: req.body.feeling_name,
    user_id: req.user._id,
    timestamp: currentTime,
  });
  newFeeling.save();
});

router.get("/feelings", auth.ensureLoggedIn, (req, res) => {
  Feeling.find({
    user_id: req.user._id,
  }).then((feelings) => {
    res.send(feelings);
  });
});

router.get("/tags", (req, res) => {
  console.log(`getting tags with feeling ${req.query.feeling}`);
  Tag.find({
    feeling: req.query.feeling,
  }).then((tags) => {
    res.send(tags);
  });
});

router.get("/tagsFromID", (req, res) => {
  console.log(`getting tags from the ID ${req.query.user_id}`);
  Tag.find({
    original_poster: req.query.user_id,
  }).then((tags) => {
    console.log(tags);
    res.send(tags);
  });
});

router.post("/tag", auth.ensureLoggedIn, (req, res) => {
  console.log(req.user._id);
  const currTime = new Date().toLocaleString();
  console.log(currTime);

  const newTag = new Tag({
    tag_id: `${req.user._id}+${currTime}`, //each tag has a unique id: combo of user id and timestamp
    activity: req.body.activity,
    feeling: req.body.feeling, //Array of Strings, each String is a feeling
    original_poster: req.user._id,
    // ratings: [0, 0, 0, 0, 0],
  });
  console.log(newTag);
  newTag.save();
});

// parameters: tagId and userId
router.post("/task-complete", auth.ensureLoggedIn, (req, res) => {
  console.log("HEREEEEE");
  console.log(req.body.tagId);
  User.findById(req.body.userId).then((user) => {
    if (user.tags === undefined) {
      user.tags = [req.body.tagId];
    } else {
      user.tags = user.tags.concat([req.body.tagId]);
    }
    console.log("here's the tag list");
    console.log(user.tags);
    user.save();
  });
});

router.get("/tags-done", auth.ensureLoggedIn, (req, res) => {
  User.findById(req.user._id).then((user) => {
    console.log("THE TAGS:");
    console.log(user.tags);
    let tagList = [];
    for (let i = 0; i < user.tags.length; i++) {
      // console.log("here");
      tagList.push(Tag.findOne({ tag_id: user.tags[i] }));
    }
    // console.log(tagList);
    Promise.all(tagList).then((finalTagList) => {
      console.log("final tag list");
      console.log(finalTagList);
      if (req.query.feeling !== undefined) {
        finalTagList = finalTagList.filter((tag) => {
          return tag.feeling === req.query.feeling;
        });
      }
      res.send(finalTagList);
    });
  });
});

router.post("/new-note", auth.ensureLoggedIn, (req, res) => {
  console.log("posting a note with this content: ");
  console.log(req.body.content);
  const newNote = new Note({
    user_id: req.user._id,
    feeling_id: req.body.feeling_id,
    content: req.body.content,
  });
  newNote.save();
});

router.get("/notes", auth.ensureLoggedIn, (req, res) => {
  console.log("getting notes");
  Note.find({
    user_id: req.user._id,
  }).then((results) => {
    console.log(res);
    res.send(results);
  });
});

router.get("/random_feeling_name", (req, res) => {
  Feeling.count().exec(function (err, count) {
    var random = Math.floor(Math.random() * count);
    Feeling.findOne()
      .skip(random)
      .exec(function (err, result) {
        res.send({ feeling: result.feeling_name });
      });
  });
});

router.post("/rating", (req, res) => {
  console.log("Here's the tag ID: " + req.body.tagId);
  Tag.findOne({
    tag_id: req.body.tagId,
  }).then((tag) => {
    console.log("adding a " + req.body.rating + " star rating to this tag: " + tag.activity);
    let newRatings = tag.ratings;
    if (tag.ratings === undefined) {
      newRatings = [0, 0, 0, 0, 0];
    }
    newRatings[req.body.rating - 1] += 1;
    console.log(newRatings);
    tag.ratings = newRatings;
    tag.markModified("ratings");
    tag.save();
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({
    msg: "API route not found",
  });
});

module.exports = router;
