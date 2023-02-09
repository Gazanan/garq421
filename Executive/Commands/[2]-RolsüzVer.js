const ayarlar = require('../../Ayarlar.json')
let mongoose = require("mongoose")
let sunucuayar = require("../Models/sunucuayar.js");

module.exports.run = async(client, message, args, embed) => {
    let data = await sunucuayar.findOne({
        guildID: message.guild.id
    });
    let BotOwner = data.BOTOWNER;
    let BanYetkili = data.BanYetkiliRol;

if (!BanYetkili.some(x => message.member.roles.cache.has(x)) && !message.member.roles.cache.has(BotOwner)) return  { 
    } 

    await message.channel.send({embeds: [embed.setDescription(`Rolü olmayanlara kayıtsız rolleri verildi.`)]})
    message.guild.members.cache.filter(s => s.roles.cache.size <= 1).forEach(s => s.roles.add(data.UNREGISTER).catch(e => {}))


}
    exports.config = {
        name: "rolsüzver",
        usage: `${ayarlar.BotPrefix}rolsüzver`,
            guildOnly: true,
        aliases: ["rolsüzver"],
        cooldown: 3000
    };
