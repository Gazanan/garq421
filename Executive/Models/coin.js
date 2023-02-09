const mongoose = require('mongoose');

let coins = new mongoose.Schema({
  guildID: { type: String, default: "" },
  userID: { type: String, default: "" },
  coin: { type: Number, default: 0 }
})


module.exports = mongoose.model("coin", coins)

