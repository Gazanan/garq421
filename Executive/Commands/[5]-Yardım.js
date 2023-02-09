const Discord = require("discord.js")
const ayarlar = require('../../Ayarlar.json')
let sunucuayar = require("../Models/sunucuayar.js");

module.exports.run = async (client, message, args, embed) => {
    let data = await sunucuayar.findOne({
        guildID: message.guild.id
    });
    let BotOwner = data.BOTOWNER;
    let BanYetkili = data.BanYetkiliRol;
    
    if (!BanYetkili.some(x => message.member.roles.cache.has(x)) && !message.member.roles.cache.has(BotOwner)) return 
	message.reply({ embeds: [embed.setDescription(`__**Moderasyon Komutları**__\n\`.ban [@ramal/ID] (Sebep)\n.unban [@ramal/ID]\n.forceban [@ramal/ID] (Sebep)\n.banlist\n.jail [@ramal/ID] (Sebep)\n.unjail [@ramal/ID]\n.cmute [@ramal/ID] (Süre) (Sebep)\n.uncmute [@ramal/ID]\n.vmute [@ramal/ID] (Süre) (Sebep)\n.vunmute [@ramal/ID]\n.cezapuan [@ramal/ID]\n.cezasorgu [@ramal/ID]\n.sicil [@ramal/ID]\n.avatar\n.banner\n.rolkontrol\n.rolsüzver\n.urlkullanım\n.tagtarama [Tag]\n.git [@ramal/ID]\n.çek [@ramal/ID]\n.denetim [Rol/Kanal]\n.say\n.sil [Number]\n.n [@ramal/ID]\n.roldenetim [Rol/ID]\n.snipe\n.zengin (Name)\n.kilit\n.kontrol\n.rollog [@ramal/ID]\n.roomcreate\`\n__**Kayıt Komutları**__\n\`.erkek [@ramal/ID] (Name) (Age)\n.kız [@ramal/ID] (Name) (Age)\n.isim [@ramal/ID] (Name) (Age)\n.isimmod\n.isimler\n.setup\n.taglıalım\n.topteyit\n.kayıtsız [@ramal/ID]\n.vip [ramal/ID]\n.info (@ramal/ID)\`\n__**Stat Komutları**__\n\`.me\n.rolstat [@ramal/ID]\n.user [@ramal/ID]\n.top\`\n__**Invite Komutları**__\n\`.topinvites\n.invite [@ramal/ID]\n.bonus [@ramal/ID]\n.sıfırla [@ramal/ID]\``)] });
   
}

exports.config = {
    name: "yardım",
    usage: `${ayarlar.BotPrefix}yardım`,
    guildOnly: true,
    aliases: ["help"],
    cooldown: 3000
};
