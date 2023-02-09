const moment = require("moment");
const ayarlar = require('../../Ayarlar.json')
const penals = require("../Models/penals");
moment.locale("tr");
const sunucuayar = require("../Models/sunucuayar");

 module.exports.run = async (client, message, args, embed) => {
    if (isNaN(args[0])) return message.reply("Ceza ID'si bir sayı olmalıdır!")
    const data = await penals.findOne({ guildID: message.guild.id, id: args[0] });
    if (!data) return message.reply(`${args[0]} ID'li bir ceza bulunamadı!`)
    message.reply({ embeds: [embed.setDescription(`#${data.id} ${data.active ? ayarlar.red : ayarlar.green} **[${data.type}]** <@${data.userID}> üyesi, ${moment(data.date).format("LLL")} tarihinde, <@${data.staff}> tarafından, \`${data.reason}\` nedeniyle, ${data.type.toLowerCase().replace("-", " ")} cezası almış.`)]});

};

exports.config = {
    name: "cezasorgu",
    usage: `${ayarlar.BotPrefix}cezasorgu `,
        guildOnly: true,
    aliases: ["cezasorgu","sorgu"],
    cooldown: 3000
};