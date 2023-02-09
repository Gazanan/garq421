const mongoose = require('mongoose');

let cezas = new mongoose.Schema({
  guildID: { type: String, default: "" },
  userID: { type: String, default: "" },
  ceza: { type: Array, default: [] },
  top: { type: Number, default: 0 },
  BanAmount: {type: Number, default: 0},
  JailAmount: {type: Number, default: 0},
  MuteAmount: {type: Number, default: 0},
  VoiceMuteAmount: {type: Number, default: 0}
})

module.exports = mongoose.model("ceza", cezas)


