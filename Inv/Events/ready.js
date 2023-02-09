const { Client } = require("discord.js");
const ayarlar = require('../../Ayarlar.json')
/**
 * 
 * @param {Client} client 
 */
module.exports = async client => {
    console.log(`[BOT] ` + client.user.tag + ' ismiyle giriş yapıldı!');
    client.user.setPresence({ activities: [{ name: ayarlar.BotDurum, type: "WATCHING" }], status: "online" });
};

module.exports.event = {
    name: 'ready'
}