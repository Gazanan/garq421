const moment = require("moment");
moment.locale("tr");
const penals = require("../Models/penals");
const ayarlar = require('../../Ayarlar.json')
const sunucuayar = require("../Models/sunucuayar");


module.exports.run = async (client, message, args, embed) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let data = await penals.find({ guildID: message.guild.id, userID: member.user.id, }).sort({ date: -1 });
    if (data.length === 0) return message.reply(`${ayarlar.green} ${member.toString()} üyesinin sicili temiz!`)
    data = data.map((x) => `__**Ceza Numarası**__: \`#${x.id}\` ${x.active ? ayarlar.green : ayarlar.red} __**Ceza İşlem**__: \`[${x.type}]\` __**Ceza Nedeni**__:\`${x.reason}\`  \n__**Ceza Tarihi**__: \`${moment(x.date).format("LLL")}\` __**Ceza İşlemi Uygulayan Yetkili**__: <@${x.staff}>\n─────────────────`).join("\n");
    for (var i = 0; i < Math.floor(data.length / 2000); i++) {
      message.reply({ embeds: [embed.setDescription(data.slice(0, 2000))]});
      data = data.slice(2000);
    }
    if (data.length > 0) message.reply({ embeds: [embed.setDescription(data)]});

};
exports.config = {
    name: "sicil",
    usage: `${ayarlar.BotPrefix}sicil (@ramal/ID)`,
        guildOnly: true,
    aliases: ["sicil"],
    cooldown: 3000
};
