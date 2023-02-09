const Discord = require("discord.js");
const ayarlar = require('../../Ayarlar.json')
const {Cevap, Register} = require('../helpers/functions.js');
const statData = require('../Models/Stats')
module.exports.run = async(client, message, args, embed) => {
    if(!Register.checkPerms(message.member)) return Cevap.yetki(message)
    let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.member;
    if(!member) return message.reply({embeds: [embed.setDescription(`${message.member}, Bir kullanıcı belirtmelisin. `)]}).sil(7);
    let data = await statData.findOne({guildID: message.guild.id, userID: member.id});
if(!data) return message.reply({embeds: [embed.setDescription(`${member} Adlı kullanıcıya ait veri bulunamadı!`)]}).sil(7)
await message.reply({embeds: [embed.setAuthor({name: message.author.tag, iconURL: message.author.avatarURL({dynamic: true})})
.setDescription(`${member} Adlı kullanıcının toplam **${data.Total}** kayıtı bulunmaktadır. \n(**${data.Man}** Erkek, **${data.Woman}** Kadın)
`)]}).sil(10)
};
exports.config = {
    name: "info",
    usage: `${ayarlar.BotPrefix}info (@ramal/ID)`,
        guildOnly: true,
    aliases: ["teyitlerim","teyit","kayıtlarım","teyitsay"],
    cooldown: 3000
};