const Discord = require("discord.js");
const ayarlar = require('../../Ayarlar.json')
const {Cevap, Register} = require('../helpers/functions.js');
const registerData = require('../Models/Register')
const sunucuayar = require("../Models/sunucuayar"); 

module.exports.run = async(client, message, args, embed) => {
    let data1 = await sunucuayar.findOne({
        guildID: message.guild.id
    });
    let ManRol = data1.MAN;

    if(!Register.checkPerms(message.member)) return Cevap.yetki(message)
    let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
    if(!member) return message.reply({embeds: [embed.setDescription(`${message.member}, Bir kullanıcı belirtmelisin. `)]}).sil(7);
    let data = await registerData.find({guildID: message.guild.id, userID: member.id});
if(!data || !data.length) return message.reply({embeds: [embed.setDescription(`${member} Adlı kullanıcının isim geçmişi bulunamadı!`)]}).sil(7)
let mapped = data.length > 0 ? data.map((value, index) => `\`${index +1}.\` **${value.Name}** (${message.guild.roles.cache.has(value.Sex) ? message.guild.roles.cache.get(value.Sex) : value.Sex == ManRol[0] ? "Erkek" : "Kadın"})`).join('\n') : "Veri bulunamadı!"
await message.reply({embeds: [embed.setAuthor({name: message.author.tag, iconURL: message.author.avatarURL({dynamic: true})}).setDescription(`${member} Adlı kullanıcının isim geçmişi\n
${mapped}`)]})
};
exports.config = {
    name: "isimler",
    usage: `${ayarlar.BotPrefix}isimler`,
        guildOnly: true,
    aliases: ["names"],
    cooldown: 3000
};