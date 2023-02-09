const mongoose = require('mongoose');

let roleVeriShe = new mongoose.Schema({
    guildID: { type: String, default: "" },
    user: { type: String, default: "" },
    rollers: { type: Array, default: [] },
    mod: { type: String, default: "" },
})

module.exports = mongoose.model("roleVeri", roleVeriShe)


