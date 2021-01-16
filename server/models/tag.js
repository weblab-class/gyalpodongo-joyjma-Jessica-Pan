const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
    id: Number,
    activity: String,
    feeling: String, //when you have this feeling, you can do this activity
    original_poster: String //user_id, equivalent to user googleid sschema 
});

// compile model from schema
module.exports = mongoose.model("tag", TagSchema);