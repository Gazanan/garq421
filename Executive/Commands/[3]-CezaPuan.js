const moment = require("moment");
const ceza = require("../Models//ceza");
const cezapuan = require("../Models/cezapuan")
moment.locale("tr");
const ayarlar = require('../../Ayarlar.json')
const messageUserChannel = require("../Models/messageUserChannel");
const sunucuayar = require("../Models/sunucuayar");

module.exports.run = async (client, message, args, embed) => {
    let data = await sunucuayar.findOne({
        guildID: message.guild.id
    });
    let BotOwner = data.BOTOWNER;
    let BanYetkili = data.BanYetkiliRol;

    if (!BanYetkili.some(x => message.member.roles.cache.has(x)) && !message.member.roles.cache.has(BotOwner)) { message.reply("Yeterli yetkin bulunmuyor!")

return 
}
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
if (!member) { message.reply( "Böyle bir kullanıcı bulunamadı!")

return 
}
const cezaData = await ceza.findOne({ guildID: ayarlar.guildID, userID: member.id });
const cezapuanData = await cezapuan.findOne({ guildID: ayarlar.guildID, userID: member.user.id });

message.reply(`${member} kişisinin toplamda \`${cezapuanData ? cezapuanData.cezapuan : 0}\` ceza puanı ve (Toplam **${cezaData ? cezaData.ceza.length : 0}** Ceza) olarak gözükmekte!`)

};

exports.config = {
    name: "cezapuan",
    usage: `${ayarlar.BotPrefix}cezapuan `,
        guildOnly: true,
    aliases: ["cezapuan","cp"],
    cooldown: 3000
};
