const mongoose = require("mongoose");

const FeelingSchema = new mongoose.Schema({
  feeling_name: String,
  user_id: String,
  timestamp: {
    //time user entered "i feel <emotion>"
    type: String,
    default: new Date().toLocaleString(),
  },
});

// compile model from schema
module.exports = mongoose.model("feeling", FeelingSchema);
