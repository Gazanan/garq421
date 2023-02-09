const Discord = require("discord.js")
const ayarlar = require('../../Ayarlar.json')
const sunucuayar = require("../Models/sunucuayar");

module.exports.run = async(client, message, args, embed) => {
    let data = await sunucuayar.findOne({
        guildID: message.guild.id
    });
    let BoosterRol = data.BOOSTER;
    let Tag = data.TAG;
    if (!message.member.roles.cache.has(BoosterRol)) return message.channel.send({ embeds: [embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)]}) ;
    let yasaklar = ["discord.gg/", ".gg/", "discord.gg", "https://discord.gg/"];
    let ism = args.slice(0).join(' ');
    if (ism.length > 32) return message.channel.send({ embeds: [embed.setDescription(`İsmin **32** Karakterden uzun olamaz!`)]}) ;
    if (yasaklar.some(s => ism.includes(s))) return message.delete().catch(e => {})
    let name;
    if (Tag.some(tag => message.author.tag.includes(tag))) {
        name = `${ism}`
    } else {
        name = `${ism}`
    }
    message.member.setNickname(name).catch(e => {});
    message.channel.send({ embeds: [embed.setDescription(`${message.author}, Yeni ismin **${name}** :partying_face:`)]}) 
};
exports.config = {
    name: "booster",
    usage: `${ayarlar.BotPrefix}booster [Name]`,
    guildOnly: true,
    aliases: ["zengin"],
    cooldown: 3000
};
