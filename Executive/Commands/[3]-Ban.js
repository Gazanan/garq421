const coin = require("../Models/coin");
const moment = require("moment");
const ceza = require("../Models//ceza");
const cezapuan = require("../Models/cezapuan")
const banLimit = new Map();
moment.locale("tr");
const ayarlar = require('../../Ayarlar.json')
const sunucuayar = require("../Models/sunucuayar");

  module.exports.run = async (client, message, args, embed) => {
    let data = await sunucuayar.findOne({
      guildID: message.guild.id
  });
  let BotOwner = data.BOTOWNER;
  let BanYetkili = data.BanYetkiliRol;
  let BanLog = data.BANLOG;
  let CezaPuanLog = data.CEZAPUANLOG;

    if (!BanYetkili.some(x => message.member.roles.cache.has(x)) && !message.member.roles.cache.has(BotOwner)) { message.reply("Yeterli yetkin bulunmuyor!")
  
    return }
    if (!args[0]) { message.reply( "Bir üye belirtmelisin!")
  
    return }
    const user = message.mentions.users.first() || await client.fetchUser(args[0]);
    if (!user) { message.reply("Böyle bir kullanıcı bulunamadı!")
  
    return }
    const ban = await client.fetchBan(message.guild, args[0]);
    if (ban) { message.reply( "Bu üye zaten banlı!")
  
    return }
    const reason = args.slice(1).join(" ") || "Belirtilmedi!";
    const member = message.guild.members.cache.get(user.id);

    if (message.guild.members.cache.has(user.id) && message.member.roles.highest.position <= message.guild.members.cache.get(user.id).roles.highest.position) return message.reply("Kendinle aynı yetkide ya da daha yetkili olan birini banlayamazsın!")
    if (member && !member.bannable) return message.reply( "Bu üyeyi banlayamıyorum!")
    if (ayarlar.banlimit > 0 && banLimit.has(message.author.id) && banLimit.get(message.author.id) == ayarlar.banlimit) return message.reply("Saatlik ban sınırına ulaştın!")
  
    if (ayarlar.dmMessages) user.send(`**${message.guild.name}** sunucusundan, **${message.author.tag}** tarafından, **${reason}** sebebiyle banlandınız!`).catch(() => {});
    message.guild.members.ban(user.id, { reason: `${reason} | Yetkili: ${message.author.tag}` , days:1}).catch(() => {});
    const penal = await client.penalize(message.guild.id, user.id, "BAN", true, message.author.id, reason);

    const messageEmbed = embed
    .setColor("#000103")
    .setAuthor({name:`${user.username}`, iconURL: `${user.avatarURL()}`})
    .setTimestamp()
    .setDescription(`**${member ? member.toString() : user.username}** Üyesi Sunucudan **${reason}** Sebebiyle \n${message.author} Tarafından **Yasaklandı** Ceza Numarası: (\`#${penal.id}\`)`)

     message.reply({ embeds: [messageEmbed] });

    const log = embed
      .setDescription(`
 ${user} - (\`${user.id}\`) Adlı kullanıcı sunucudan yasaklandı!  
 \`\`\`
 • Yetkili: ${message.author.tag} - (${message.author.id})
 • Sunucudan yasaklanma sebebi: ${reason}
 • Sunucudan yasaklanma tarihi: ${moment(Date.now()).format("LLL")}\`\`\`
 >  (Ceza Numarası: \`#${penal.id}\`)

      `)
      message.guild.channels.cache.get(BanLog).wsend({ embeds: [log] });

    await coin.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { coin: -100 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { BanAmount: 1 } }, {upsert: true});
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 100 } }, { upsert: true });

    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(CezaPuanLog) message.guild.channels.cache.get(CezaPuanLog).wsend({ embeds: [embed.setDescription(`${member} üyesi ban cezası alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`)]});
    if (ayarlar.banlimit > 0) {
      if (!banLimit.has(message.author.id)) banLimit.set(message.author.id, 1);
      else banLimit.set(message.author.id, banLimit.get(message.author.id) + 1);
      setTimeout(() => {
        if (banLimit.has(message.author.id)) banLimit.delete(message.author.id);
      }, 1000 * 60 * 60);
    }
  };

exports.config = {
    name: "ban",
    usage: `${ayarlar.BotPrefix}ban (@ramal/ID)`,
        guildOnly: true,
    aliases: ["yargı"],
    cooldown: 3000
};
