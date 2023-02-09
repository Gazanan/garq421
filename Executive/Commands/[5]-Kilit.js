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
let everyone = message.guild.roles.cache.find(a => a.name === "@everyone");
if (message.channel.permissionsFor(everyone).has('SEND_MESSAGES')) {
  await message.channel.permissionOverwrites.edit(everyone.id, { SEND_MESSAGES: false });
  await message.reply({ embeds: [embed.setDescription(`${ayarlar.green} <#${message.channel.id}> kanalı, ${message.author} tarafından kilitlendi!`)] })
} else {
  await message.channel.permissionOverwrites.edit(everyone.id, { SEND_MESSAGES: null });
  await message.reply({ embeds: [embed.setDescription(`${ayarlar.green} <#${message.channel.id}> kanalının kilidi, ${message.author} tarafından açıldı!`)] });
};

}
exports.config = {
    name: "kilit",
    usage: `${ayarlar.BotPrefix}kilit`,
    guildOnly: true,
    aliases: ["kilit"],
    cooldown: 3000
};