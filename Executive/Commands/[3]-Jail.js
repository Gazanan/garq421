const coin = require("../Models/coin");
const moment = require("moment");
const ceza = require("../Models//ceza");
const cezapuan = require("../Models/cezapuan")
const jailLimit = new Map();
const ms = require("ms")
moment.locale("tr");
const ayarlar = require('../../Ayarlar.json')
const sunucuayar = require("../Models/sunucuayar");


  module.exports.run = async (client, message, args, embed) => {
    let data = await sunucuayar.findOne({
      guildID: message.guild.id
  });
  let BotOwner = data.BOTOWNER;
  let JailYetkili = data.JailYetkiliRol;
  let Karantina = data.CezalıRol;
  let JailLog = data.JAILLOG;
  let CezaPuanLog = data.CEZAPUANLOG;

  if (!JailYetkili.some(x => message.member.roles.cache.has(x)) && !message.member.roles.cache.has(BotOwner)) 
    {
    
    message.reply("Yeterli yetkin bulunmuyor!")
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const user = message.mentions.users.first() || await client.fetchUser(args[0]);
    if (!member) { message.reply( "Bir üye belirtmelisin!")
     
    return }
    if (member.roles.cache.has(Karantina)) { message.reply( "Bu üye zaten jailde!")
     
    return }
    const reason = args.slice(2).join(" ") || "Belirtilmedi!";
    if (message.member.roles.highest.position <= member.roles.highest.position) return message.reply(embed.setDescription("Kendinle aynı yetkide ya da daha yetkili olan birini jailleyemezsin!"));
    if (!member.manageable) return message.reply( "Bu üyeyi jailleyemiyorum!");
    if (ayarlar.jaillimit > 0 && jailLimit.has(message.author.id) && jailLimit.get(message.author.id) == ayarlar.jaillimit) 
    {
    
    message.reply("Saatlik jail sınırına ulaştın!")
    return }
    
    const penal = await client.penalize(message.guild.id, member.user.id, "JAIL", true, message.author.id, reason);
    if (ayarlar.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle jaillendiniz.`).catch(() => {});
    
    const messageEmbed = embed
    .setColor("#000103")
    .setAuthor({name:`${user.username}`, iconURL: `${user.avatarURL()}`})
    .setTimestamp()
    .setDescription(`**${member ? member.toString() : user.username}** Üyesi Sunucudan **${reason}** Sebebiyle \n${message.author} Tarafından jail atıldı! Ceza Numarası: (\`#${penal.id}\`)`)

     message.reply({ embeds: [messageEmbed] });

    const log = embed
      .setDescription(`
 ${user} - (\`${user.id}\`) Adlı kullanıcı cezalıya atıldı!
 \`\`\`
• Yetkili: ${message.author.tag} - (${message.author.id})
• Jail atılma sebebi: ${reason}
• Jail atılma tarihi: ${moment(Date.now()).format("LLL")}\`\`\`
>  (Ceza Numarası: \`#${penal.id}\`)    
      `)

      message.guild.channels.cache.get(JailLog).wsend({ embeds: [log] }); 

      await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
      await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
      await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});
      await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
      await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 20 } }, { upsert: true });
      const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
      if(CezaPuanLog) message.guild.channels.cache.get(CezaPuanLog).wsend({ embeds: [embed.setDescription(`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`)]});
      member.roles.set(Karantina);

    if (ayarlar.jaillimit > 0) {
      if (!jailLimit.has(message.author.id)) jailLimit.set(message.author.id, 1);
      else jailLimit.set(message.author.id, jailLimit.get(message.author.id) + 1);
      setTimeout(() => {
        if (jailLimit.has(message.author.id)) jailLimit.delete(message.author.id);
      }, 1000 * 60 * 60);
    }
};

exports.config = {
    name: "jail",
    usage: `${ayarlar.BotPrefix}jail (@ramal/ID)`,
        guildOnly: true,
    aliases: ["jail","reklam"],
    cooldown: 3000
};
