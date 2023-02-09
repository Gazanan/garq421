const Discord = require("discord.js")
const ayarlar = require('../../Ayarlar.json')
const rollers = require("../Models/roleVeri");
let sunucuayar = require("../Models/sunucuayar.js");

module.exports.run = async (client, message, args, embed) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply({ embeds: [embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)] }).sil(7);
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    var sayi = 1
    var currentPage = 1
    if (!member) {
        message.reply("üye belirt").sil(10)
        return 
    }
    rollers.findOne({ user: member.id }, async (err, res) => {
    if(!res)
    {
        message.reply(`${member} kişisinin rol bilgisi veritabanında bulunmadı.`).sil(10)
        return 
    }
    let rol = res.rollers.sort((a, b) => b.tarih - a.tarih)
    rol.map(x => ` \`[${x.tarih}, ${x.state}]\` <@${x.mod}> : <@&${x.rol}>[<@${x.user}>] `)
    let pages = rol.chunk(5);
    if(pages.length === 1) {
        await message.channel.send({ embeds: [embed.setDescription(`${member} adlı üyenin rol ekleme-çıkarma bilgileri aşağıda görüntülenmiştir.\n\n${pages[currentPage - 1].map(x => `\`[${x.tarih}, ${x.state}]\` <@${x.mod}> : <@&${x.rol}>[<@${x.user}>]`).join("\n")}`).setAuthor(member.user.username, member.user.avatarURL({ dynamic: true }))] })
    } else {
        const row = new Discord.MessageActionRow()
        .addComponents(
        new Discord.MessageButton()
        .setCustomId('rgeri')
        .setLabel("◀")
        .setStyle('PRIMARY'),
        new Discord.MessageButton()
        .setCustomId('rollogiptal')
        .setLabel("❌")
        .setStyle('DANGER'),
        new Discord.MessageButton()
        .setCustomId('rileri')
        .setLabel("▶")
        .setStyle('PRIMARY'),
        );
        let msg = await message.channel.send({ components: [row], embeds: [embed.setDescription(`${member} adlı üyenin rol ekleme-çıkarma bilgileri aşağıda görüntülenmiştir.\n\n${pages[currentPage - 1].map(x => `\`[${x.tarih}, ${x.state}]\` <@${x.mod}> : <@&${x.rol}>[<@${x.user}>]`).join("\n")}`).setFooter(`Sayfa: ${currentPage}`).setAuthor(member.user.username, member.user.avatarURL({ dynamic: true }))] })
        var filter = (button) => button.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
        collector.on('collect', async (button, user) => {
            if (button.customId === "rileri") {

                if (currentPage == pages.length) return;
                currentPage++;
                if (msg) msg.edit({ embeds: [embed.setDescription(`${pages[currentPage - 1].map(x => `\`[${x.tarih}, ${x.state}]\` <@${x.mod}> : <@&${x.rol}>[<@${x.user}>]`).join("\n")}`).setThumbnail(member.user.avatarURL({ dynamic: true })).setFooter(`Sayfa: ${currentPage}`)] });

            } else if (button.customId === "rollogiptal") {

                if (msg) msg.delete().catch(err => { });
                if (message) return message.delete().catch(err => { });

            } else if (button.customId === "rgeri") {

                if (currentPage == 1) return;
                currentPage--;
                if (msg) msg.edit({ embeds: [embed.setDescription(`${pages[currentPage - 1].map(x => `\`[${x.tarih}, ${x.state}]\` <@${x.mod}> : <@&${x.rol}>[<@${x.user}>]`).join("\n")}`).setThumbnail(member.user.avatarURL({ dynamic: true })).setFooter(`Sayfa: ${currentPage}`)] });
            }
        });
        } 
        })
    }


exports.config = {
    name: "rollog",
    usage: `${ayarlar.BotPrefix}rollog`,
    guildOnly: true,
    aliases: ["rollogs"],
    cooldown: 3000
};


