const moment = require("moment");
moment.locale("tr");
const penals = require("../Models/penals");
const ayarlar = require('../../Ayarlar.json')
const sunucuayar = require("../Models/sunucuayar");

  module.exports.run = async (client, message,  args, embed) => {
    let ramaldata = await sunucuayar.findOne({
      guildID: message.guild.id
  });
  let BotOwner = ramaldata.BOTOWNER;
  let JailYetkili = ramaldata.JailYetkiliRol;
  let Karantina = ramaldata.CezalıRol;
  let JailLog = ramaldata.JAILLOG;
  let Kayitsiz = ramaldata.UNREGISTER;

  if (!JailYetkili.some(x => message.member.roles.cache.has(x)) && !message.member.roles.cache.has(BotOwner)) 
    {
    
    message.reply( "Yeterli yetkin bulunmuyor!")
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const user = message.mentions.users.first() || await client.fetchUser(args[0]);
    if (!member) {
    
    message.reply( "Bir üye belirtmelisin!")
    return }
    if (member.roles.cache.has(Karantina)) 
    {
    
    message.reply( "Bu üye jailde değil!")
    return }
    if (!message.member.permissions.has(8) && member.roles.highest.position >= message.member.roles.highest.position) 
    {
    
    message.reply( "Kendinle aynı yetkide ya da daha yetkili olan birinin jailini kaldıramazsın!")
    return }
    if (!member.manageable) {
      
    message.reply( "Bu üyeyi jailden çıkaramıyorum!")
    return }

    member.roles.set(Kayitsiz);
    const data = await penals.findOne({ userID: member.user.id, guildID: message.guild.id, $or: [{ type: "JAIL" }, { type: "TEMP-JAIL" }], active: true });
    if (data) {
      data.active = false;
      await data.save();
    }
    
    message.reply(`${member.toString()} üyesinin jaili ${message.author} tarafından kaldırıldı!`)
    if (ayarlar.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, jailiniz kaldırıldı!`).catch(() => {});

    const log = embed
    .setColor("#000103")
    .setAuthor({name:`${user.username}`, iconURL: `${user.avatarURL()}`})
    .setTimestamp()
      .setDescription(`
Jaili Kaldırılan Üye: \`(${user.username.replace(/\`/g, "")} - ${user.id})\`  
Jaili Kaldıran Yetkili: ${message.author} (\`${message.author.id}\`)
Jaili Kaldırılma Tarihi: \`${moment(Date.now()).format("LLL")}\`
          `)
          message.guild.channels.cache.get(JailLog).wsend({ embeds: [log] }); //JAİLOG TANIMLA ramal

};

exports.config = {
    name: "unjail",
    usage: `${ayarlar.BotPrefix}unjail (@ramal/ID)`,
    guildOnly: true,
    aliases: ["unjail"],
    cooldown: 3000
  }; 