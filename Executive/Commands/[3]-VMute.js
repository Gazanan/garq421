const coin = require("../Models/coin");
const moment = require("moment");
const ceza = require("../Models//ceza");
const cezapuan = require("../Models/cezapuan")
const vmuteLimit = new Map();
moment.locale("tr");
const ms = require("ms");
const ayarlar = require('../../Ayarlar.json')
const sunucuayar = require("../Models/sunucuayar");

  module.exports.run= async (client, message, args, embed) => {
    let data = await sunucuayar.findOne({
      guildID: message.guild.id
  });
  let BotOwner = data.BOTOWNER;
  let VmuteYetkili = data.VmuteYetkiliRol;
  let Vmuteli = data.VmuteliRol;
  let VmuteLog = data.VMUTELOG;
  let CezaPuanLog = data.CEZAPUANLOG;

  if (!VmuteYetkili.some(x => message.member.roles.cache.has(x)) && !message.member.roles.cache.has(BotOwner))
    {
    
    message.reply( "Yeterli yetkin bulunmuyor!")
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const user = message.mentions.users.first() || await client.fetchUser(args[0]);
    if (!member) {
    
    message.reply( "Bir üye belirtmelisin!")
    return }
    if (member.roles.cache.has(Vmuteli))
    {
    
    message.reply( "Bu üye zaten susturulmuş!")
    return }
    const duration = args[1] ? ms(args[1]) : undefined;
    if (!duration) {
    
    message.reply( `Geçerli bir süre belirtmelisin!`)
    return }
    const reason = args.slice(2).join(" ") || "Belirtilmedi!";
    if (message.member.roles.highest.position <= member.roles.highest.position) 
    {
    
    message.reply( "Kendinle aynı yetkide ya da daha yetkili olan birini susturamazsın!")
    return }
    if (!member.manageable) 
    {
    
    message.reply( "Bu üyeyi susturamıyorum!")
    return }
    if (ayarlar.voicemutelimit > 0 && vmuteLimit.has(message.author.id) && vmuteLimit.get(message.author.id) == ayarlar.voicemutelimit) 
    {
    
    message.reply( "Saatlik susturma sınırına ulaştın!")
    return }

    const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + duration);
   
    if (ayarlar.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle **sesli kanallarda** susturuldunuz!`).catch(() => {});

    const time = ms(duration).replace("h", " saat").replace("m", " dakika").replace("s", " saniye");
    
    const messageEmbed = embed
    .setColor("#000103")
    .setAuthor({name:`${user.username}`, iconURL: `${user.avatarURL()}`})
    .setTimestamp()
    .setDescription(`**${member ? member.toString() : user.username}** Üyesi Sunucudan **${reason}** Sebebiyle \n${message.author} Tarafından Tüm Ses Kanallarından Susturuldu! Ceza Numarası: (\`#${penal.id}\`)`)

     message.reply({ embeds: [messageEmbed] });


    const log = embed
    .setDescription(`
${user} - (\`${user.id}\`) Adlı kullanıcı ses kanallarında susturuldu!
\`\`\`
• Yetkili: ${message.author.tag} - (${message.author.id})
• Süre: ${reason}
• Susturulma sebebi: ${reason}
• Ses Mute atılma tarihi: ${moment(Date.now()).format("LLL")}
>  (Ceza Numarası: \`#${penal.id}\`)
    `)
    message.guild.channels.cache.get(VmuteLog).wsend({ embeds: [log] });

    await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { VoiceMuteAmount: 1 } }, {upsert: true});
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 20 } }, { upsert: true });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(CezaPuanLog) message.guild.channels.cache.get(CezaPuanLog).wsend({ embeds: [embed.setDescription(`${member} üyesi \`voice mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`)]});
    member.roles.add(Vmuteli);
    if (member.voice.channelID && !member.voice.serverMute) {
      member.voice.setMute(true);
      member.roles.add(Vmuteli);
    }

    if (ayarlar.voicemutelimit > 0) {
      if (!vmuteLimit.has(message.author.id)) vmuteLimit.set(message.author.id, 1);
      else vmuteLimit.set(message.author.id, vmuteLimit.get(message.author.id) + 1);
      setTimeout(() => {
        if (vmuteLimit.has(message.author.id)) vmuteLimit.delete(message.author.id);
      }, 1000 * 60 * 60);
    }
};

exports.config = {
    name: "vmute",
    usage: `${ayarlar.BotPrefix}vmute (@ramal/ID)`,
    guildOnly: true,
    aliases: ["vmute","voicemute"],
    cooldown: 3000
  }; 
