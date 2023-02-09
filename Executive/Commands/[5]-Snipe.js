const { MessageEmbed } = require("discord.js");
const snipe = require("../Models/snipe");
const moment = require("moment");
require('moment-duration-format');
const ayarlar = require('../../Ayarlar.json')
const sunucuayar = require("../Models/sunucuayar")

module.exports.run = async(client, message, args, embed) => {    
  let data = await sunucuayar.findOne({
    guildID: message.guild.id
});
let BotOwner = data.BOTOWNER;
let BanYetkili = data.BanYetkiliRol;

  let sıra = args[0]
  let numbers = [1, 2, 3, 4, 5];
  let snipeData = await snipe.find({ guildID: message.guild.id });
  let list = snipeData.map((data, index) => `[${moment.duration(Date.now() - data.zaman).format("D [Gün], H [Saat], m [Dakika], s [Saniye]")}] ${message.guild.members.cache.get(data.userID) ? message.guild.members.cache.get(data.userID) : 'Bulunamadı'}: **${data.mesaj}**`);
  if (snipeData.length <= 0) return message.reply({ embeds: [embed.setDescription(`Sunucu mesaj verisi bulunamadı!`)]}) 
  if (!sıra) {
      return message.channel.send({
          embeds: [embed.setDescription(`
${list.slice(snipeData.length - 1, snipeData.length)}
  `)]
      })
  }
  if (!numbers.some(s => sıra.includes(s))) return message.reply({ embeds: [embed.setDescription(`Lütfen geçerli bir rakam giriniz.`)]}) 
  if (sıra) {
      return message.reply({ embeds: [embed.setDescription(`${list.slice(snipeData.length > sıra ? snipeData.length - sıra : 0, snipeData.length).join('\n')}`)]}) 
  }
}

  exports.config = {
    name: "snipe",
    usage: `${ayarlar.BotPrefix}snipe`,
    guildOnly: true,
    aliases: ["snipe"],
    cooldown: 3000
  }; 


 