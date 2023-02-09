const mongoose = require('mongoose');

let UsersShema = new mongoose.Schema({
    userID: String,
    TeyitNo: Number,
    Teyitler: { type: Array, default: [] },
    Taggeds: { type: Array, default: [] },
    Registrant: Object,
    Inviter: Object,
    AfkStatus: Object,
    Names: { type: Array, default: [] },
    kayit: {type: Array , default: []}
})

module.exports = mongoose.model("Users", UsersShema)



