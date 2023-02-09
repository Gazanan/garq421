const coin = require("../Models/coin");
const moment = require("moment");
const ceza = require("../Models//ceza");
const banLimit = new Map();
moment.locale("tr");
const penals = require("../Models/penals");
const ayarlar = require('../../Ayarlar.json')
const sunucuayar = require("../Models/sunucuayar");

  module.exports.run = async (client, message, args, embed) => {
    let ramaldata = await sunucuayar.findOne({
      guildID: message.guild.id
  });
  let BotOwner = ramaldata.BOTOWNER;
  let VmuteYetkili = ramaldata.VmuteYetkiliRol;
  let Vmuteli = ramaldata.VmuteliRol;
  let VmuteLog = ramaldata.VMUTELOG;

  if (!VmuteYetkili.some(x => message.member.roles.cache.has(x)) && !message.member.roles.cache.has(BotOwner))
    {
    
    message.reply( "Yeterli yetkin bulunmuyor!") }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const user = message.mentions.users.first() || await client.fetchUser(args[0]);
    if (!member) 
    {    
    
    message.reply( "Bir üye belirtmelisin!") }
    if (member.roles.cache.has(Vmuteli) && (member.voice.channelID && !member.voice.serverMute)) 
    {
    
    message.reply( "Bu üye muteli değil!") }
    if (!message.member.permissions.has(8) && member.roles.highest.position >= message.member.roles.highest.position) 
    {
    
    message.reply( "Kendinle aynı yetkide ya da daha yetkili olan birinin susturmasını kaldıramazsın!")}
    if (!member.manageable) 
    {
    
    message.reply( "Bu üyenin susturmasını kaldıramıyorum!") }

    
    member.roles.remove(Vmuteli);
    if (member.voice.channelID && member.voice.serverMute) member.voice.setMute(false);
    const data = await penals.findOne({ userID: member.user.id, guildID: message.guild.id, type: "VOICE-MUTE", active: true });
    if (data) {
      data.active = false;
      data.removed = true;
      await data.save();
    }
    message.reply(`${member.toString()} üyesinin **sesli kanallarda** susturması, ${message.author} tarafından kaldırıldı!`)
    if (ayarlar.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından **sesli kanallarda** olan susturmanız kaldırıldı!`).catch(() => {});

    const log = embed
    .setColor("#000103")
    .setAuthor({name:`${user.username}`, iconURL: `${user.avatarURL()}`})
    .setTimestamp()
      .setDescription(`   
Ses Mute Kaldırılan Üye: \`(${user.username.replace(/\`/g, "")} - ${user.id})\`        
Ses Mute Kaldıran Yetkili: ${message.author} (\`${message.author.id}\`)
Ses Mute Kaldırma Tarihi Kaldırılma Tarihi: \`${moment(Date.now()).format("LLL")}\`
          `)
          message.guild.channels.cache.get(VmuteLog).wsend({ embeds: [log] });
};

exports.config = {
  name: "unvmute",
  usage: `${ayarlar.BotPrefix}unvmute (@ramal/ID)`,
  guildOnly: true,
  aliases: ["unvmute","unvoicemute"],
  cooldown: 3000
}; 
