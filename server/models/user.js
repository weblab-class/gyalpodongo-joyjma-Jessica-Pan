const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  score: Number,
  tags: [String], //Array of task ids [Number]
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
