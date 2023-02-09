const moment = require("moment");
moment.locale("tr");
const penals = require("../Models/penals");
const ayarlar = require('../../Ayarlar.json')
const sunucuayar = require("../Models/sunucuayar");

module.exports.run = async (client, message, args, embed) => {
  let ramaldata = await sunucuayar.findOne({
    guildID: message.guild.id
});
let BotOwner = ramaldata.BOTOWNER;
let CmuteYetkili = ramaldata.CmuteYetkiliRol;
let Cmuteli = ramaldata.CmuteliRol;
let CmuteLog = ramaldata.CMUTELOG;


if (!CmuteYetkili.some(x => message.member.roles.cache.has(x)) && !message.member.roles.cache.has(BotOwner))
    {
    
    message.reply( "Yeterli yetkin bulunmuyor!")
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const user = message.mentions.users.first() || await client.fetchUser(args[0]);
    if (!member) 
    {
    
    message.reply( "Bir üye belirtmelisin!")
    return }
    if (member.roles.cache.has(Cmuteli))
    {
    
    message.reply( "Bu üye muteli değil!")  
    return }
    if (!message.member.permissions.has(8) && member.roles.highest.position >= message.member.roles.highest.position) 
    {
    
    message.reply( "Kendinle aynı yetkide ya da daha yetkili olan birinin susturmasını kaldıramazsın!")
    return }
    if (!member.manageable) 
    {
    
    message.reply( "Bu üyenin susturmasını kaldıramıyorum!")
    return }
    
    
    member.roles.remove(Cmuteli);
    const data = await penals.findOne({ userID: member.user.id, guildID: message.guild.id, type: "CHAT-MUTE", active: true });
    if (data) {
      data.active = false;
      await data.save();
    }
    message.reply(`${member.toString()} üyesinin susturması, ${message.author} tarafından kaldırıldı!`)
    if (ayarlar.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından susturmanız kaldırıldı!`).catch(() => {});

    const log = embed
    .setColor("#000103")
    .setAuthor({name:`${user.username}`, iconURL: `${user.avatarURL()}`})
    .setTimestamp()
      .setDescription(` 
Chat Mute Kaldırılan Üye: \`(${user.username.replace(/\`/g, "")} - ${user.id})\`            
Chat Mute Kaldıran Yetkili : ${message.author} (\`${message.author.id}\`)
Chat Mute Kaldırılma Tarihi: \`${moment(Date.now()).format("LLL")}\`
          `)
          message.guild.channels.cache.get(CmuteLog).wsend({ embeds: [log] });

};
exports.config = {
  name: "uncmute",
  usage: `${ayarlar.BotPrefix}uncmute (@ramal/ID)`,
      guildOnly: true,
  aliases: ["unmute","uncmute"],
  cooldown: 3000
};
