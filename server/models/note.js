const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
  feeling_id: String,
  content: String,
  user_id: String,
});

// compile model from schema
module.exports = mongoose.model("note", NotesSchema);
