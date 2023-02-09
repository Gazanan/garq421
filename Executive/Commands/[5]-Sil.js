const Discord = require("discord.js"); 
const ayarlar = require('../../Ayarlar.json')
const sunucuayar = require("../Models/sunucuayar");

module.exports.run = async (client, message, args, embed) => {
    let data = await sunucuayar.findOne({
        guildID: message.guild.id
    });
    let BotOwner = data.BOTOWNER;
    let BanYetkili = data.BanYetkiliRol;

if (!BanYetkili.some(x => message.member.roles.cache.has(x)) && !message.member.roles.cache.has(BotOwner)) return 
  if (!args[0]) return message.channel.send(`${ayarlar.red} Bir miktar belirtmelisin!`)
  if (isNaN(args[0])) return message.channel.send(`${ayarlar.red} Belirttiğin miktar bir sayı olmalı!`)
  await message.delete();
  await message.channel.bulkDelete(args[0]);
  message.channel.send(`${ayarlar.green} ${args[0]} adet mesaj silindi!`)

};
exports.config = {
    name: "sil",
    usage: `${ayarlar.BotPrefix}sil`,
    guildOnly: true,
    aliases: ["sil","temizle","clear"],
    cooldown: 3000
};
