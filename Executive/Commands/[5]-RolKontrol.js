const Discord = require("discord.js")
const ayarlar = require('../../Ayarlar.json')
let sunucuayar = require("../Models/sunucuayar.js");
module.exports.run = async(client, message, args, embed) => {
    let data = await sunucuayar.findOne({
        guildID: message.guild.id
    });
    let BotOwner = data.BOTOWNER;
    let BanYetkili = data.BanYetkiliRol;

if (!BanYetkili.some(x => message.member.roles.cache.has(x)) && !message.member.roles.cache.has(BotOwner)) return message.channel.send({ embeds: [embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)]});
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(s => s.name.toLowerCase().includes(args.slice(0).join(' ')))

    let yt = message.guild.roles.cache.filter(s => s.permissions.has("ADMINISTRATOR"))
    let rolyt = message.guild.roles.cache.filter(s => s.permissions.has("MANAGE_ROLES"))
    let knlyt = message.guild.roles.cache.filter(s => s.permissions.has("MANAGE_CHANNELS"))

    message.channel.send({embeds: [embed.setDescription(`
Sunucuda Yönetici olan roller; **${yt.size}**
${yt.map(s => `${message.guild.roles.cache.get(s.id)}`)}
Sunucuda Rol yönet olan roller; **${rolyt.size}**
${rolyt.map(s => `${message.guild.roles.cache.get(s.id)}`)}
Sunucuda Kanal yönet olan roller; **${knlyt.size}**
${knlyt.map(s => `${message.guild.roles.cache.get(s.id)}`)}
    `)]})

}
exports.config = {
    name: "rolkontrol",
    usage: `${ayarlar.BotPrefix}rolkontrol [@Role/ID/Name]`,
    guildOnly: true,
    aliases: ["rolkontrol"],
    cooldown: 3000  
};
