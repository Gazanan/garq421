const mongoose = require('mongoose');

let voiceJoinedAtShema = new mongoose.Schema({
    userID: String,
    date: Number,
})

module.exports = mongoose.model("voiceJoinedAt", voiceJoinedAtShema)
