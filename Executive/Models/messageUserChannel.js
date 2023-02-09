const mongoose = require('mongoose');

let messageUserChannelShema = new mongoose.Schema({
  guildID: String,
  userID: String,
  channelID: String,
  channelData: { type: Number, default: 0 },
})


module.exports = mongoose.model("messageUserChannel", messageUserChannelShema)




