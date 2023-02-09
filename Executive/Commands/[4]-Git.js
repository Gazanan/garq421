const { MessageButton, MessageActionRow, MessageEmbed } = require('discord.js');
const moment = require("moment");
moment.locale("tr");
const ayarlar = require('../../Ayarlar.json')
const sunucuayar = require("../Models/sunucuayar");

module.exports.run = async (client, message, args, embed, prefix) => {
    let data = await sunucuayar.findOne({
        guildID: message.guild.id
    });
    let TransporterLog = data.TRANSPORTERLOG;


    if (!message.member.voice.channel) return message.reply(`Bir ses kanalında olmalısın!`);
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return message.reply("Bir üye etiketle ve tekrardan dene!", message.author, message.channel);
    if (!member.voice.channelId) return message.reply("Bu kullanıcı herhangi bir ses kanalında bulunmuyor!", message.author, message.channel);

    const row1 = new MessageActionRow().addComponents(
        new MessageButton().setCustomId("onay").setLabel("Kabul Et").setStyle("SUCCESS").setEmoji(ayarlar.yes),
        new MessageButton().setCustomId("red").setLabel("Reddet").setStyle("DANGER").setEmoji(ayarlar.no),
    );

    const row2 = new MessageActionRow().addComponents(
        new MessageButton().setCustomId("başarılı").setLabel("İşlem Başarılı").setStyle("SUCCESS").setDisabled(true),
    );

    const row3 = new MessageActionRow().addComponents(
        new MessageButton().setCustomId("başarısız").setLabel("İşlem Başarısız").setStyle("DANGER").setDisabled(true),
    );

    if (message.member.permissions.has("ADMINISTRATOR")) {
        message.member.voice.setChannel(member.voice.channelId);
        message.react(ayarlar.green);
        message.reply({ embeds: [embed.setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })).setDescription(`${message.author}, ${member} kişisinin yanınıza gittiniz.`)] });
        const log = embed
            .setColor("#2f3136")

            .setDescription(`Bir Transport işlemi gerçekleşti. \n\nTarih: ${moment(Date.now()).format("LLL")} \nOdaya Giden Kullanıcı: ${member} - \`${member.id}\` \nOdasına Gidilen Yetkili: ${message.author} - \`${message.author.id}\``)
            message.guild.channels.cache.get(TransporterLog).wsend({ embeds: [log] });
    } else {
        let ozi = new MessageEmbed()
            .setDescription(`${member}, ${message.author} \`${message.member.voice.channel.name}\` odasına gelmek istiyor. Kabul ediyor musun?`)
            .setAuthor({ name:`${member.user.username}`, iconURL: member.user.avatarURL({ dynamic: true }) })

        const mesaj = await message.channel.send({ content: `${member.toString()}`, embeds: [ozi], components: [row1] });
        const eresbos = e => e.user.id === member.user.id; 
        const collector = await mesaj.createMessageComponentCollector({ filter: eresbos, time: 30000, errors: ["time"] });

        collector.on("collect", async (button) => {
            if (button.customId === "onay") {
                await button.deferUpdate();
                const embeds = new MessageEmbed() 
                    .setAuthor({ name: `${member.user.username}`, iconURL: member.user.avatarURL({ dynamic: true }) })
                    .setTimestamp()
                    .setDescription(`${message.author}, ${member} kişisinin yanına başarıyla gittiniz.`)
                    message.member.voice.setChannel(member.voice.channelId);
                if (mesaj) mesaj.edit({ embed: [embeds], components : [row2] });
            } else if (button.customId === "red") {
                await button.deferUpdate();
                const embedss = new MessageEmbed() 
                    .setAuthor({ name: `${member.user.username}`, iconURL: member.user.avatarURL({ dynamic: true }) })
                    .setTimestamp()
                    .setDescription(`${message.author}, ${member} yanına gitme işlemi iptal edildi.`)
                if (mesaj) mesaj.edit({ embed: [embedss], components : [row3] });
            }
        });
    }
};

exports.config = {
    name: "git",
    usage: `${ayarlar.BotPrefix}git (@ramal/ID)`,
    guildOnly: true,
    aliases: ["git"],
    cooldown: 3000
};

