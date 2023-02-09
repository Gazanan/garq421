let mongoose = require("mongoose")
let sunucuayar = require("../Models/sunucuayar.js");
const ayarlar = require('../../Ayarlar.json')

module.exports.run = async(client, message, args, embed) => {    
    let data = await sunucuayar.findOne({
        guildID: message.guild.id
    });
    let BotOwner = data.BOTOWNER;
    let BanYetkili = data.BanYetkiliRol;

if (!BanYetkili.some(x => message.member.roles.cache.has(x)) && !message.member.roles.cache.has(BotOwner)) return 
     var üyesayısı = message.guild.members.cache.size;
    let tagges = message.guild.members.cache.filter(s => data.TAG.some(a => s.user.tag.toLowerCase().includes(a))).size
    let ses = message.guild.members.cache.filter(s => s.voice.channel).size
    let boost = message.guild.premiumSubscriptionCount;
    let boostlevel = message.guild.premiumTier == "NONE" ? 0 : message.guild.premiumTier;
    var atkifler = message.guild.members.cache.filter(m => m.presence && m.presence.status !== "offline").size

    message.channel.send({embeds: [embed.setDescription(`
    ❯ Şuan da toplam **${ses}** kişi ses kanallarında aktif.
    ❯ Sunucu da şuan da toplam **${üyesayısı}** üye var (**${atkifler}** Aktif).
    ❯ Toplam **${tagges}** kişi tagımızı alarak bize destek oluyor. 
    ❯ Sunucumuz şuan da  **3** seviye ve **${boost}** boost basılmış.`)]}) 

}
    exports.config = {
        name: "say",
        usage: `${ayarlar.BotPrefix}say`,
            guildOnly: true,
        aliases: ["say"],
        cooldown: 3000
    };
