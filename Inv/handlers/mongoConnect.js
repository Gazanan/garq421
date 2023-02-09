const ayarlar = require('../../Ayarlar.json')
const { connect, connection } = require("mongoose");

connect(ayarlar.Mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: false
});



connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
    console.log("[MongoDB] bağlantısı başarılı!");
});
