const Discord = require("discord.js");
const ayarlar = require('../../Ayarlar.json')
const {Cevap, Register} = require('../helpers/functions.js');
const sunucuayar = require("../Models/sunucuayar"); 

module.exports.run = async(client, message, args, embed) => {
    let data = await sunucuayar.findOne({
        guildID: message.guild.id
    });
    let unRegisterRol = data.UNREGISTER;
    let Booster = data.BOOSTER;
    let defaultName = data.DEFAULTNAME;

if(!Register.checkPerms(message.member)) return Cevap.yetki(message)
let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
if(!member) return message.reply({embeds: [embed.setDescription(`${message.member}, Bir kullanıcı belirtmelisin. `)]}).sil(7);
if(member.user.bot) return message.reply({embeds: [embed.setDescription(`${message.member}, Kayıtsıza attığın kullanıcı bir bot olamaz!`)]}).sil(7)
if(member.user.id == message.member.id) return message.reply({embeds: [embed.setDescription(`${message.member}, Kendini kayıtsıza atamazsın!`)]}).sil(7);
if(member.user.id == message.guild.ownerId) return message.reply({embeds: [embed.setDescription(`${message.member}, Sunucu sahibini kayıtsıza atamazsın!`)]}).sil(7);
if(member.roles.highest.position >= message.member.roles.highest.position) return message.reply({embeds: [embed.setDescription(`${message.member}, Bu kullanıcı sizden üst/aynı pozisyonda.`)]}).sil(7);
if(member.roles.cache.has(Booster)) return message.reply({embeds: [embed.setDescription(`${message.member}, Booster bir kullanıcıyı kayıtsıza atamazsın!`)]}).sil(7);
if(unRegisterRol.some(s => member.roles.cache.has(s))) return message.reply({embeds: [embed.setDescription(`${message.member}, Bu kullanıcı zaten kayıtsız!`)]}).sil(7);

await member.roles.set(unRegisterRol).catch();
await member.setNickname(defaultName).catch();
await message.reply({embeds: [embed.setDescription(`${member}, Adlı kullanıcı başarıyla kayıtsıza atıldı!`)]}).sil(7);
};
exports.config = {
    name: "kayıtsız",
    usage: `${ayarlar.BotPrefix}kayıtsız [@ramal/ID]`,
    guildOnly: true,
    aliases: ["unregister"],
    cooldown: 3000
};