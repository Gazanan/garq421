const Discord = require("discord.js"); 
const ayarlar = require('../../Ayarlar.json')
const sunucuayar = require("../Models/sunucuayar");

module.exports.run = async (client, message, args) => {
    let data = await sunucuayar.findOne({
        guildID: message.guild.id
    });
    let BotOwner = data.BOTOWNER;
    let BanYetkili = data.BanYetkiliRol;
    let TaglıRol = data.CREW;

if (!BanYetkili.some(x => message.member.roles.cache.has(x)) && !message.member.roles.cache.has(BotOwner)) return 
const user = message.mentions.users.first() || await client.fetchUser(args[0]);
let embed = new Discord.MessageEmbed()
let discrim = args[0]
if(!discrim) return message.reply({ embeds: [embed.setDescription(`${ayarlar.red} **Geçerli bir Tag belirtmelisin.**\n *Örnek Kullanım:* \`.tag-tarama [Tag]\``)] });  
    message.guild.members.cache.forEach(arx => {
    if (arx.user.username.includes(discrim) || arx.user.discriminator.includes(discrim)) {
    arx.roles.add(TaglıRol)
    }})
    message.reply({ embeds: [embed.setDescription(`${ayarlar.green} **Başarıyla \`${discrim}\` tagınıza sahip üyelere rolü verilmiştir.** `)] });
}
exports.config = {
    name: "tagtarama",
    usage: `${ayarlar.BotPrefix}tagtarama <tag> <taglı rol ıd>`,
    guildOnly: true,
    aliases: ["tag-tarma"],
    cooldown: 3000
};