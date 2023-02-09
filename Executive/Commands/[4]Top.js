const sunucuVeri = require("../Models/sunucuayar")
const ayarlar = require('../../Ayarlar.json')
const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const messageGuild = require("../../Stat/src/schemas/messageGuild");
const messageGuildChannel = require("../../Stat/src/schemas/messageGuildChannel");
const voiceGuild = require("../../Stat/src/schemas/voiceGuild");
const voiceGuildChannel = require("../../Stat/src/schemas/voiceGuildChannel");
const messageUser = require("../../Stat/src/schemas/messageUser");
const voiceUser = require("../../Stat/src/schemas/voiceUser");
const coin = require("../Models/coin");
const inviteSchema = require('../../Inv/models/invite');
const statData = require('../Models/Stats')
module.exports.run = async (client, message, args) => {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const row = new Discord.MessageActionRow()
        .addComponents(
        new Discord.MessageButton()
        .setCustomId('topsesmesaj')
        .setLabel("Top (Ses/Mesaj)")
        .setStyle('PRIMARY'),
        new Discord.MessageButton()
        .setCustomId('topdavet')
        .setLabel("Top Davet")
        .setStyle('DANGER'),
        new Discord.MessageButton()
        .setCustomId('topkayıt')
        .setLabel("Top Kayıt")
        .setStyle('SECONDARY')
        );
        
        const embed = new Discord.MessageEmbed()
        let msg = await message.channel.send({ components: [row], embeds: [embed.setDescription(`${message.member} Hey, **${message.guild.name}** Sunucusunun verilerini aşşağıdaki butonları kullanarak görebilirsiniz.`)] })
        var filter = (button) => button.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
        collector.on('collect', async (button) => {
            if (button.customId === "topsesmesaj") {
                row.components[0].setDisabled(true);
                msg.edit({ components: [row] }); 
        
                const messageChannelData = await messageGuildChannel.find({ guildID: message.guild.id }).sort({ channelData: -1 });
    const voiceChannelData = await voiceGuildChannel.find({ guildID: message.guild.id }).sort({ channelData: -1 });
    const messageUsersData = await messageUser.find({ guildID: message.guild.id }).sort({ topStat: -1 });
    const voiceUsersData = await voiceUser.find({ guildID: message.guild.id }).sort({ topStat: -1 });
    const messageGuildData = await messageGuild.findOne({ guildID: message.guild.id });
    const voiceGuildData = await voiceGuild.findOne({ guildID: message.guild.id });
    const coinData = await coin.find({ guildID: message.guild.id }).sort({ coin: -1 });

    let coinSum = 0;

    const messageChannels = messageChannelData.splice(0, 5).map((x, index) => `\`${index+1}.\` <#${x.channelID}>: \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n");
    const voiceChannels = voiceChannelData.splice(0, 5).map((x, index) => `\`${index+1}.\` <#${x.channelID}>: \`${moment.duration(x.channelData).format("H [saat], m [dakika] s [saniye]")}\``).join("\n");
    const messageUsers = messageUsersData.splice(0, 5).map((x, index) => `\`${index+1}.\` <@${x.userID}>: \`${Number(x.topStat).toLocaleString()} mesaj\``).join("\n");
    const voiceUsers = voiceUsersData.splice(0, 5).map((x, index) => `\`${index+1}.\` <@${x.userID}>: \`${moment.duration(x.topStat).format("H [saat], m [dakika] s [saniye]")}\``).join("\n");
    const coinUsers = coinData.splice(0, 5).map((x, index) => {
      coinSum += x.coin;
      return `\`${index+1}.\` <@${x.userID}>: \`${Number(Math.floor(x.coin)).toLocaleString()} coin\``;
    }).join("\n");
        const topsesmesaj = new Discord.MessageEmbed()
        
        topsesmesaj.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }));
        topsesmesaj.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));
        topsesmesaj.setDescription(`**${message.guild.name}** sunucusunun toplam ses ve chat bilgileri gösterilmektedir.`)
        .addField(`**Genel ses sıralaması(\`Toplam ${moment.duration(voiceGuildData ? voiceGuildData.topStat : 0).format("H [saat], m [dakika] s [saniye]")}\`)**`,`${voiceUsers.length > 0 ? voiceUsers : "Veri Bulunmuyor."}`,true)
        .addField(`**Genel chat sıralaması(\`Toplam ${Number(messageGuildData ? messageGuildData.topStat : 0).toLocaleString()} mesaj\`)**`,`${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`,true)
     button.message.edit({ embeds: [topsesmesaj] })
   
    }
    else if(button.customId == "topdavet") {
        row.components[1].setDisabled(true)
        msg.edit({ components: [row] }); 
        let data = await inviteSchema.find({ guildID: message.guild.id });
        if (data.length < 1) return message.channel.send({ embeds: [guildEmbed.setDescription(`Sunucuya ait davet verisi bulunamadı!`)] }).sil(7);
        let listed = data.filter(s => s.Regular > 0 && message.guild.members.cache.has(s.userID)).sort((a, b) => b.Regular - a.Regular).map((value, index) => `\`${index + 1}.\` <@!${value.userID}> Kullanıcısının (Gerçek: **${value.Regular}** Sahte: **${value.Fake}** Ayrılan: **${value.Left}** Bonus: **${value.Bonus}**)`).slice(0, 10).join('\n');
        const topdavet = new Discord.MessageEmbed()
        
        topdavet.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }));
        topdavet.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));
        topdavet.setDescription(`**${message.guild.name}** Sunucusunun top 10 davet verileri; \n\n ${listed}`)
     button.message.edit({ embeds: [topdavet] })
    }
    else if(button.customId == "topkayıt") {
        row.components[2].setDisabled(true)
        msg.edit({ components: [row] }); 
        let data = await statData.find({guildID: message.guild.id})
        if(!data.length) return message.reply({embeds: [embed.setDescription(`${message.member} Sunucuya ait veri bulunamadı!`)]}).sil(7)
        let top = data.filter(s => message.guild.members.cache.has(s.userID) && s.Total > 0).sort((a, b) => b.Total - a.Total).map((value, index) => `\`${index +1}.\` ${message.guild.members.cache.get(value.userID)} toplam **${value.Total}** (Erkek **${value.Man}** - Kadın **${value.Woman}** )`).slice(0, 15).join('\n')

        const topkayıt = new Discord.MessageEmbed()
        
        topkayıt.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }));
        topkayıt.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));
        topkayıt.setDescription(`**${message.guild.name}** Sunucusunun top kayıt verileri; \n\n${top}`)
     button.message.edit({ embeds: [topkayıt] })
        
    }
});
    }

exports.config = {
    name: "top",
    usage: `${ayarlar.BotPrefix}top`,
    guildOnly: true,
    aliases: [],
    cooldown: 3000
};












