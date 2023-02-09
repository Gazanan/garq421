const Discord = require("discord.js")
const ayarlar = require('../../Ayarlar.json')
let sunucuayar = require("../Models/sunucuayar.js");

module.exports.run = async (client, message, args, embed) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply({ embeds: [embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)] }).sil(7);
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
    if(!args[0]) return message.reply("Rol bilgisine bakmak istediğin rolü belirt ve tekrar dene !", message.author, message.channel)
    if(!role) return message.reply("Belirtmiş olduğun rolü bulamadım ! Düzgün bir rol etiketle veya ID belirtip tekrar dene.", message.author, message.channel)
    let sayı = role.members.size
    if(sayı > 200) return message.reply(`${role} rolünde toplam ${sayı} kişi olduğundan dolayı rol bilgisini yollayamıyorum.`)
    let üyeler = role.members.map(x => `<@${x.id}> - (\`${x.id}\`) `)
    message.reply(`- ${role} rol bilgileri;
- Rol Rengi: \`${role.hexColor}\`
- Rol ID: \`${role.id}\`
- Rol Kişi Sayısı: \`${sayı}\`
─────────────────
- Roldeki Kişiler: 
${üyeler.join("\n")}
    `, { split: true })
   
}

exports.config = {
    name: "rol",
    usage: `${ayarlar.BotPrefix}rol`,
    guildOnly: true,
    aliases: [],
    cooldown: 3000
};
