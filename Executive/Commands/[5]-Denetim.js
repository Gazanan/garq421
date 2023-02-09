const Discord = require("discord.js"); 
const ayarlar = require('../../Ayarlar.json')
const sunucuayar = require("../Models/sunucuayar");

module.exports.run = async (client, message, args, embed) => { 
  let data = await sunucuayar.findOne({
    guildID: message.guild.id
});
let BotOwner = data.BOTOWNER;
let BanYetkili = data.BanYetkiliRol;

if (!BanYetkili.some(x => message.member.roles.cache.has(x)) && !message.member.roles.cache.has(BotOwner)) return 

if (!args[0] || !args[0].toLowerCase() === "rol" && !args[0].toLowerCase() === "kanal") return message.channel.send({ embeds: [embed.setDescription(`Lütfen \`rol/kanal\` olmak üzere geçerli bir eylem belirtiniz ${ayarlar.red}`)]})
if (args[0].toLowerCase() === "rol") {
  const audit = await message.guild.fetchAuditLogs({ type: 'ROLE_DELETE' }).then(a => a.entries)
  const denetim = audit.filter(e => Date.now() - e.createdTimestamp < 1000 * 60 * 60).map(e => `\n 1 Saat içinde Silinen Rol Bilgileri\nSilinen Rol id: ${e.target.id} Silinen Rol İsim: ${e.changes.filter(e => e.key === 'name').map(e => e.old)}`)
  if (!denetim.length) return message.channel.send({ embeds: [embed.setDescription(`Son 1 saat de silinmiş herhangi bir rol bulunamadı!`)]})
  const arr = Discord.Util.splitMessage(`${denetim}`, { maxLength: 1950, char: "\n" });
  arr.forEach(element => {
      message.channel.send(Discord.Formatters.codeBlock("js", element));
  });
} else if (args[0].toLowerCase() === "kanal") {
  const audit = await message.guild.fetchAuditLogs({ type: 'CHANNEL_DELETE' }).then(a => a.entries)
  const denetim = audit.filter(e => Date.now() - e.createdTimestamp < 1000 * 60 * 60).map(e => `\n 1 Saat içinde Silinen Kanal Bilgileri\nSilinen Kanal id: ${e.target.id} Silinen Kanal İsim: ${e.changes.filter(e => e.key === 'name').map(e => e.old)}`)
  if (!denetim.length) return message.channel.send({ embeds: [embed.setDescription(`Son 1 saat de silinmiş herhangi bir kanal bulunamadı!`)]})
  const arr = Discord.Util.splitMessage(`${denetim}`, { maxLength: 1950, char: "\n" });
  arr.forEach(element => {
      message.channel.send(Discord.Formatters.codeBlock("js", element));
  });
}

}

exports.config = {
    name: "denetim",
    usage: `${ayarlar.BotPrefix}denetim <tag> <taglı rol ıd>`,
    guildOnly: true,
    aliases: ["denetim"],
    cooldown: 3000
};