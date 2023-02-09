const joinedAt = require("../Models/voiceJoinedAt");
const moment = require("moment");
require("moment-duration-format");
const ayarlar = require('../../Ayarlar.json')
const sunucuayar = require("../Models/sunucuayar");

module.exports.run = async (client, message, args, embed) => {
    let data = await sunucuayar.findOne({
        guildID: message.guild.id
    });
    let BotOwner = data.BOTOWNER;
    let BanYetkili = data.BanYetkiliRol;

if (!BanYetkili.some(x => message.member.roles.cache.has(x)) && !message.member.roles.cache.has(BotOwner)) return 
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if (!member) return message.reply("Bir Kullanıcı Belirt")
if (!member.voice.channel) return message.reply({ embeds: [embed.setDescription(`${member} adlı kullanıcı herhangi bir ses kanalında değil.`)] });
else {
    let joinedAtData = await joinedAt.findOne({ userID: member.id });
    let limit = member.voice.channel.userLimit || "Limit Yok";
    let mic = member.voice.selfMute ? `${ayarlar.red}` : `${ayarlar.green}`
    let kulak = member.voice.selfDeaf ? `${ayarlar.red}` : `${ayarlar.green}`
    let video = member.voice.selfVideo ? `${ayarlar.green}` : `${ayarlar.red}`
    let stream = member.voice.streaming ? `${ayarlar.green}` : `${ayarlar.red}`
    message.reply({ embeds: [embed.setDescription(`${member}, adlı kullanıcı <#${member.voice.channel.id}> adlı ses kanalında bulunuyor.\nMikrafonu; ${mic}\nKulaklığı; ${kulak}\nKamerası; ${video}\nYayın; ${stream}\nKanaldaki kişi sayısı; \`${member.voice.channel.members.size}/${limit}\`\nKanalda Bulunma Süresi: ${joinedAtData ? moment.duration(joinedAtData ? Date.now() - joinedAtData.date : 0).format("H [saat], m [dakika] s [saniye]") : "Süre bulunamadı"}`)] })
}
}

exports.config = {
    name: "seskontrol",
    usage: `${ayarlar.BotPrefix}seskontrol`,
    guildOnly: true,
    aliases: ["seskontrol","n"],
    cooldown: 3000
};
