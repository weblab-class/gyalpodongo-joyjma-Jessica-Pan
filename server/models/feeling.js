const mongoose = require("mongoose");

const FeelingSchema = new mongoose.Schema({
    feeling_name: String,
    user_id: String,
    timestamp: { //time user entered "i feel <emotion>"
        type: Date,
        default: Date.now
    },
});

// compile model from schema
module.exports = mongoose.model("feeling", FeelingSchema);