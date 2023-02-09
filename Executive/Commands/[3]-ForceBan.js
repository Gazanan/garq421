const moment = require("moment");
moment.locale("tr");
const forceBans = require("../Models/forceBans");
const sunucuayar = require("../Models/sunucuayar");
const ayarlar = require('../../Ayarlar.json')

  module.exports.run =  async (client, message, args, embed) => {
    let data = await sunucuayar.findOne({
      guildID: message.guild.id
  });
  let BotOwner = data.BOTOWNER;
  let BanLog = data.BANLOG;


    if (!message.member.roles.cache.has(BotOwner)) return 
    if (!args[0]) { 
      
    message.reply( "Bir üye belirtmelisin!")
    return }
    const user = message.mentions.users.first() || await client.fetchUser(args[0]);
    if (!user) {
        
    message.reply( "Böyle bir kullanıcı bulunamadı!")
    return }
    const ban = await forceBans.findOne({ guildID: message.guild.id, userID: user.id });
    if (ban) {
    
    message.reply( "Bu üye zaten banlı!")
    return }
    const reason = args.slice(1).join(" ") || "Belirtilmedi!";
    const member = message.guild.members.cache.get(user.id);
    if (message.guild.members.cache.has(user.id) && message.member.roles.highest.position <= message.guild.members.cache.get(user.id).roles.highest.position) return message.reply("Kendinle aynı yetkide ya da daha yetkili olan birini banlayamazsın!")
    if (member && !member.bannable) {
    
    message.reply("Bu üyeyi banlayamıyorum!")}

    if (sunucuayar.dmMessages) user.send(`**${message.guild.name}** sunucusundan, **${message.author.tag}** tarafından, **${reason}** sebebiyle **kalıcı olarak** banlandınız!`).catch(() => {});

    message.guild.members.ban(user.id, { reason }).catch(() => {});
    await new forceBans({ guildID: message.guild.id, userID: user.id, staff: message.author.id }).save();
    const penal = await client.penalize(message.guild.id, user.id, "FORCE-BAN", true, message.author.id, reason);
    
    const messageEmbed = embed
    .setColor("#000103")
    .setAuthor({name:`${user.username}`, iconURL: `${user.avatarURL()}`})
    .setTimestamp()
    .setDescription(`**${member ? member.toString() : user.username}** Üyesi Sunucudan **${reason}** Sebebiyle \n${message.author} Tarafından **kalıcı olarak** banlandı! Ceza Numarası: (\`#${penal.id}\`)`)

     message.reply({ embeds: [messageEmbed] });

    const log = embed
      .setDescription(`
${user} - (\`${user.id}\`) Adlı kullanıcı sunucudan kalıcı olarak yasaklandı!  
\`\`\`
• Yetkili: ${message.author.tag} - (${message.author.id})
• Sunucudan kalıcı olarak yasaklanma sebebi: ${reason}
• Sunucudan yasaklanma tarihi: ${moment(Date.now()).format("LLL")}\`\`\`
>  (Ceza Numarası: \`#${penal.id}\`)
      `)
      message.guild.channels.cache.get(BanLog).wsend({ embeds: [log] });

};

exports.config = {
    name: "forceban",
    usage: `${ayarlar.BotPrefix}forceban (@ramal/ID)`,
        guildOnly: true,
    aliases: ["forceban"],
    cooldown: 3000
};
