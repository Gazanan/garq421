const mongoose = require("mongoose");
const ayarlar = require('../../../Ayarlar.json')

mongoose.connect(ayarlar.Mongo, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});


