const {MessageButton, MessageActionRow} = require("discord.js");
const ayarlar = require('../../Ayarlar.json')
const modsData = require('../Models/Mods.js');
const {Cevap, Register} = require('../helpers/functions.js');
const sunucuayar = require("../Models/sunucuayar"); 

module.exports.run = async(client, message, args, embed) => {
    let data = await sunucuayar.findOne({
        guildID: message.guild.id
    });
    let vipRole = data.VIP;

if(!message.member.permissions.has('ADMINISTRATOR')) return Cevap.yetki(message);
let r = message.guild.roles.cache.get(vipRole)
if(!r) return message.reply({embeds: [embed.setDescription(`${message.member}, Vip rolü girilmemiş.`)]}).sil(7)
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.reply({embeds: [embed.setDescription(`${message.member}, Bir kullanıcı belirt!`)]}).sil(7)
if(member.roles.highest.position >= message.member.roles.highest.position) return message.reply({embeds: [embed.setDescription(`${message.member}, Bu kullanıcı sizden üst/aynı pozisyonda!`)]}).sil(7)
if(member.user.bot) return message.reply({embeds: [embed.setDescription(`${message.member}, Botlara vip veremezsin!`)]}).sil(7)
if(member.id == message.member.id) return message.reply({embeds: [embed.setDescription(`${message.member}, Kendine vip veremezsin!`)]}).sil(7)
if(member.user.id == message.guild.ownerId) return message.reply({embeds: [embed.setDescription(`${message.member}, Sunucu sahibine vip veremezsin!`)]}).sil(7);
if(member.roles.cache.has(r.id)) {
await member.roles.remove(r.id).catch(e => {});
await message.reply({embeds: [embed.setDescription(`${member}, Adlı kullanıcıdan ${r} rolü alındı!`)]}).sil(7)
} else {
    await member.roles.add(r.id).catch(e => {});
    await message.reply({embeds: [embed.setDescription(`${member}, Adlı kullanıcıya ${r} rolü verildi!`)]}).sil(7)
}
};
exports.config = {
    name: "vip",
    usage: `${ayarlar.BotPrefix}vip [ramal/ID]`,
    guildOnly: true,
    aliases: [],
    cooldown: 3000
};