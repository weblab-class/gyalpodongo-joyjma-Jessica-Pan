const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  tag_id: String,
  activity: String,
  feeling: String, //when you have this feeling, you can do this activity
  ratings: [Number],
  original_poster: String, //user_id, equivalent to user googleid sschema
});

// compile model from schema
module.exports = mongoose.model("tag", TagSchema);
