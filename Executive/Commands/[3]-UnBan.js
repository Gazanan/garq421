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
  let BanYetkili = ramaldata.BanYetkiliRol;
  let BanLog = ramaldata.BANLOG;

    if (!BanYetkili.some(x => message.member.roles.cache.has(x)) && !message.member.roles.cache.has(BotOwner))
    {
  
    message.reply( "Yeterli yetkin bulunmuyor!")
    return }
    if (!args[0]) 
    {
  
    message.reply( "Bir üye belirtmelisin!")
    return }
    const ban = await client.fetchBan(message.guild, args[0]);
    const user = message.mentions.users.first() || await client.fetchUser(args[0]);
    const member = message.guild.members.cache.get(user.id);

    message.guild.members.unban(args[0], `${message.author.username} tarafından kaldırıldı!`).catch(() => {});
    const data = await penals.findOne({ userID: user.id, guildID: message.guild.id, type: "BAN", active: true });
    if (data) {
      data.active = false;
      await data.save();
    }
  
    message.reply(`\`(${user.username.replace(/\`/g, "")} - ${user.id})\` adlı üyenin banı ${message.author} tarafından kaldırıldı!`)
    if (ayarlar.dmMessages) user.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından banınız kaldırıldı!`).catch(() => {});

    const log = embed
    .setColor("#000103")
    .setAuthor({name:`${user.username}`, iconURL: `${user.avatarURL()}`})
    .setTimestamp()
      .setDescription(`
Banı Kaldırılan Üye: \`(${user.username.replace(/\`/g, "")} - ${user.id})\`
Banı Kaldıran Yetkili: ${message.author} \`${message.author.id}\`
Banın Kaldırılma Tarihi: \`${moment(Date.now()).format("LLL")}\`
      `)
     message.guild.channels.cache.get(BanLog).wsend({ embeds: [log] });
};
exports.config = {
  name: "unban",
  usage: `${ayarlar.BotPrefix}unban (@ramal/ID)`,
  guildOnly: true,
  aliases: ["unban"],
  cooldown: 3000
}; 