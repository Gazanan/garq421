const mongoose = require('mongoose');

let cezapuans = new mongoose.Schema({
  guildID: { type: String, default: "" },
  userID: { type: String, default: "" },
  cezapuan: { type: Number, default: 0 }
})
  
module.exports = mongoose.model("cezapuan", cezapuans)


