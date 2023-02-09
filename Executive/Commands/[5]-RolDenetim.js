const Discord = require("discord.js")
const ayarlar = require('../../Ayarlar.json')
let sunucuayar = require("../Models/sunucuayar.js");

module.exports.run = async (client, message, args, embed) => {
    let data = await sunucuayar.findOne({
        guildID: message.guild.id
    });
    let BotOwner = data.BOTOWNER;
    let BanYetkili = data.BanYetkiliRol;
    
    if (!BanYetkili.some(x => message.member.roles.cache.has(x)) && !message.member.roles.cache.has(BotOwner)) return 
    let roles = args.length > 0 ? message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) : message.guild.roles.cache.find(x => x.id == data.BanYetkiliRol)
    if(!roles) return message.reply("Bir rol belirt", message.author, message.channel)
    let voiceMembers = message.guild.members.cache.filter(x => {
        return x.roles.cache.has(roles.id) && x.voice.channel
    })
    let notVoiceMembers = message.guild.members.cache.filter(x => {
        return x.roles.cache.has(roles.id) && !x.voice.channel
    })
    message.channel.send({ embeds: [embed.setDescription(`\`\`\`Rol İsim: ${roles.name} | Rol ID: ${roles.id} | Toplam Üye:  ${roles.members.size}\`\`\`
    
    \`\`\`Roldeki Seste Olan Kullanıcılar (${voiceMembers.size}): \`\`\`` + voiceMembers.map(x => "" + x.displayName + "").join(",")+ `\n
    \`\`\`Roldeki Seste Olmayan Kullanıcılar(${notVoiceMembers.size}): \`\`\`` +notVoiceMembers.map(x => "<@" + x.id + ">").join(","))] })
}


exports.config = {
    name: "ysay",
    usage: `${ayarlar.BotPrefix}ysay`,
    guildOnly: true,
    aliases: [],
    cooldown: 3000
};
