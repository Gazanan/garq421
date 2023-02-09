const sunucuVeri = require("../Models/sunucuayar")
const ayarlar = require('../../Ayarlar.json')
const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
moment.locale('tr');
const messageUserChannel = require("../Models/messageUserChannel");
const voiceUserChannel = require("../../Stat/src/schemas/voiceUserChannel");
const messageGuild = require("../../Stat/src/schemas/messageGuild");
const messageGuildChannel = require("../../Stat/src/schemas/messageGuildChannel");
const voiceGuild = require("../../Stat/src/schemas/voiceGuild");
const voiceGuildChannel = require("../../Stat/src/schemas/voiceGuildChannel");
const messageUser = require("../../Stat/src/schemas/messageUser");
const voiceUser = require("../../Stat/src/schemas/voiceUser");
const coin = require("../Models/coin");
const voiceUserParent = require("../../Stat/src/schemas/voiceUserParent");
const sunucuayar = require("../Models/sunucuayar"); 
const inviteSchema = require('../../Inv/models/invite');
const statData = require('../Models/Stats')

module.exports.run = async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const row = new Discord.MessageActionRow()
        .addComponents(
        new Discord.MessageButton()
        .setCustomId('mesesmesaj')
        .setLabel("Ses/Mesaj)")
        .setStyle('PRIMARY'),
        new Discord.MessageButton()
        .setCustomId('medavet')
        .setLabel("Davet")
        .setStyle('DANGER'),
        new Discord.MessageButton()
        .setCustomId('mekayıt')
        .setLabel("Kayıt")
        .setStyle('SECONDARY')
        );
        
        const embed = new Discord.MessageEmbed()
        let msg = await message.channel.send({ components: [row], embeds: [embed.setDescription(`${message.member} Hey, **${message.guild.name}** Sunucusunda olan kayıtlı verilerini aşşağıdaki butonları kullanarak görebilirsin.`)] })
        var filter = (button) => button.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
        collector.on('collect', async (button) => {
            if (button.customId === "mesesmesaj") {
                row.components[0].setDisabled(true);
                msg.edit({ components: [row] }); 
        
                let ramaldata = await sunucuayar.findOne({
                    guildID: message.guild.id
                })
                let PublicKategori = ramaldata.PUBLICPARENTS;
                let RegisterKategori = ramaldata.REGISTERPARENTS;
                let SorunCozmeKategori = ramaldata.SOLVINGPARENTS;
                let PrivateKategori = ramaldata.PRIVATEPARENTS;
                let AloneKategori = ramaldata.ALONEPARENTS;
                let EglenceKategori = ramaldata.FUNPARENTS;
        
                const category = async (parentsArray) => {
                    const data = await voiceUserParent.find({ guildID: message.guild.id, userID: message.author.id });
                    const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
                    let voiceStat = 0;
                    for (var i = 0; i <= voiceUserParentData.length; i++) {
                        voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
                    }
                    return moment.duration(voiceStat).format("H [saat], m [dakika] s [saniye]");
                };
        
                const Active1 = await messageUserChannel.find({ guildID: message.guild.id, userID: message.author.id }).sort({ channelData: -1 });
                const Active2 = await voiceUserChannel.find({ guildID: message.guild.id, userID: message.author.id }).sort({ channelData: -1 });
                const voiceLength = Active2 ? Active2.length : 0;
                let voiceTop;
                let messageTop;
                Active1.length > 0 ? messageTop = Active1.splice(0, 5).map(x => `<#${x.channelID}>: \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n") : messageTop = "Veri bulunmuyor.";
                Active2.length > 0 ? voiceTop = Active2.splice(0, 5).map(x => `<#${x.channelID}>: \`${moment.duration(x.channelData).format("H [saat], m [dakika] s [saniye]")}\``).join("\n") : voiceTop = "Veri bulunmuyor.";
        
                const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: message.author.id });
                const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: message.author.id });
        
                const messageDaily = messageData ? messageData.dailyStat : 0;
                const messageWeekly = messageData ? messageData.weeklyStat : 0;
        
                const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [saat], m [dakika] s [saniye]");
                const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika] s [saniye]");
        
                const coinData = await coin.findOne({ guildID: message.guild.id, userID: message.author.id });
        
                const filteredParents = message.guild.channels.cache.filter((x) =>
                    x.type === "category" &&
                    !PublicKategori.includes(x.id) &&
                    !RegisterKategori.includes(x.id) &&
                    !SorunCozmeKategori.includes(x.id) &&
                    !PrivateKategori.includes(x.id) &&
                    !AloneKategori.includes(x.id) &&
                    !EglenceKategori.includes(x.id)
                );
        
        
        embed.setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))
        embed.setDescription(`Kullanıcının ${moment(Date.now()).format("LLL")} tarihinden  itibaren ${message.guild.name} sunucusunda toplam ses ve mesaj bilgileri aşağıda belirtilmiştir.`)
        .addFields(
{ name: `• __**Toplam Mesaj**__`,  value: `
\`\`\`fix
${messageData ? messageData.topStat : 0} Mesaj
\`\`\`
`, inline: true },
        
{ name: `• __**Haftalık Mesaj**__`,  value: `
\`\`\`fix
${Number(messageWeekly).toLocaleString()} Mesaj 
\`\`\`
`, inline: true },
{ name: `• __**Günlük Mesaj**__`,  value: `
\`\`\`fix
${Number(messageDaily).toLocaleString()} Mesaj
\`\`\`
`, inline: true },
{ name: `• __**Toplam Ses**__`,  value: `
\`\`\`js
${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika], s [saniye]")}
\`\`\`
`, inline: true },
{ name: `• __**Haftalık Ses**__`,  value: `
\`\`\`js
${voiceWeekly}
\`\`\`
`, inline: true },
{ name: `• __**Günlük Ses**__`,  value: `
\`\`\`js
${voiceDaily}
\`\`\`
`, inline: true },
        )
        embed.addField(
            `**__Sohbet Ettiğin Text Kanalları__**:`,
            `${messageTop}`,
            true
          );
          embed.addField(
            `**__Vakit Geçirdiğin Ses Kanalları__**: (Toplam ${voiceLength} kanal)`,
             `${voiceTop}`,
            true
          );
     button.message.edit({ embeds: [embed] })
   
    }
    else if(button.customId == "medavet") {
        row.components[1].setDisabled(true)
        msg.edit({ components: [row] }); 

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let data = await inviteSchema.findOne({ guildID: message.guild.id, userID: member.id });
        const medavet = new Discord.MessageEmbed()
        
        medavet.setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))
        if (!data) return  medavet.setDescription(`**${message.guild.name}** Sunucusunun veri tabanında davet bilginiz bulunamadı!`)
        medavet.setDescription(`${message.member} Kullanıcısının (Gerçek: **${data.Regular}** Sahte: **${data.Fake}** Ayrılan: **${data.Left}** Bonus: **${data.Bonus}**)!`)
     button.message.edit({ embeds: [medavet] })
    }
    else if(button.customId == "mekayıt") {
        row.components[2].setDisabled(true)
        msg.edit({ components: [row] }); 
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let data = await statData.findOne({guildID: message.guild.id, userID: member.id});
        const mekayıt = new Discord.MessageEmbed()
        
        mekayıt.setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))
        if(!data) return mekayıt.setDescription(`**${message.guild.name}** Sunucusunun veri tabanında davet bilginiz bulunamadı!`)
        mekayıt.setDescription(`${member} Adlı kullanıcının toplam **${data.Total}** kayıtı bulunmaktadır. \n(**${data.Man}** Erkek, **${data.Woman}** Kadın)`)
     button.message.edit({ embeds: [mekayıt] })
        
    }
});
    }

exports.config = {
    name: "me",
    usage: `${ayarlar.BotPrefix}me`,
    guildOnly: true,
    aliases: [],
    cooldown: 3000
};
