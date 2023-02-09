const ayarlar = require('../../Ayarlar.json')
const sunucuayar = require("../Models/sunucuayar");

module.exports.run = async(client, message, args, embed) => { 
    let data = await sunucuayar.findOne({
        guildID: message.guild.id
    });
    let BotOwner = data.BOTOWNER;
    let BanYetkili = data.BanYetkiliRol;

    if (!BanYetkili.some(x => message.member.roles.cache.has(x)) && !message.member.roles.cache.has(BotOwner)) return 
message.guild.fetchVanityData()
  .then(res => {
    message.reply(`Sunucunun ÖZEL URL'SI (\`${res.code}\`) toplam **${res.uses}** kullanıma sahip.`);
  })
  .catch(console.error);
}
exports.config = {
    name: "urlkullanım",
    usage: `${ayarlar.BotPrefix}url`,
    guildOnly: true,
    aliases: ["url"],
    cooldown: 3000
};