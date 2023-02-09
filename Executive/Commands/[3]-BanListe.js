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

    if (!BanYetkili.some(x => message.member.roles.cache.has(x)) && !message.member.roles.cache.has(BotOwner)) { message.reply("Yeterli yetkin bulunmuyor!")
    
    return }
    const ban = await client.fetchBan(message.guild, args[0]);
    if (ban) { message.reply( "Bu üye zaten banlı!")
    
    return }
    message.guild.bans.fetch().then(banned => {
if(!banned){ 
return message.reply("Sunucuda yasaklı üye bulunmamakta.")
}
    let list = banned.map(user => `\`\`\`ID:                | Kullanıcı Adı:\`\`\`\n${user.user.id} | ${user.user.tag}`).join('\n');
    message.reply(`${list}\n\nSunucuda toplamda ${banned.size} yasaklı kullanıcı bulunmakta.`, { code: "js", split: true })
    })
};
exports.config = {
    name: "banlist",
    usage: `${ayarlar.BotPrefix}banliste (@ramal/ID)`,
     guildOnly: true,
    aliases: ["banliste","yargılist","banliste"],
    cooldown: 3000
};
