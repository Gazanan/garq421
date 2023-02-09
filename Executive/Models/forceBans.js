const mongoose = require('mongoose');

let forceBanShema = new mongoose.Schema({
  guildID: { type: String, default: "" },
  userID: { type: String, default: "" },
  staff: { type: String, default: "" }
})

module.exports = mongoose.model("forceBans", forceBanShema)



