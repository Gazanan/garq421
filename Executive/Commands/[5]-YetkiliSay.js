const sunucuVeri = require("../Models/sunucuayar")
const ayarlar = require('../../Ayarlar.json')
const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
    let data = await sunucuVeri.findOne({
        guildID: message.guild.id
    });
    let BotOwner = data.BOTOWNER;
    let BanYetkili = data.BanYetkiliRol;

if (!BanYetkili.some(x => message.member.roles.cache.has(x)) && !message.member.roles.cache.has(BotOwner)) return 
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const row = new Discord.MessageActionRow()
        .addComponents(
        new Discord.MessageButton()
        .setCustomId('yetkilisay')
        .setLabel("📋")
        .setStyle('PRIMARY'),
        new Discord.MessageButton()
        .setCustomId('yetkilidm')
        .setLabel("📨")
        .setStyle('PRIMARY'),
        new Discord.MessageButton()
        .setCustomId('yetkiliptal')
        .setLabel("❌")
        .setStyle('DANGER')
        );
        const embed = new Discord.MessageEmbed()
        let msg = await message.channel.send({ components: [row], embeds: [embed.setDescription(`**YETKİLİ SAY BUTON ÖZELLİKLERİ**
       
        >  📋 Butonu yetkili verilerini görüntüler
        
        >  📨 Yetkili dm duyuru geçer
        
        >  ❌ İşlemi iptal eder.`)] })
        var filter = (button) => button.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
        collector.on('collect', async (button) => {
            if (button.customId === "yetkilisay") {
         let enAltYetkiliRolü = message.guild.roles.cache.get(ayarlar.enaltyt);  
         let yetkili = message.guild.members.cache.filter(uye => !uye.user.bot && uye.roles.highest.position >= enAltYetkiliRolü.position).size;     
        var sesdekiler = message.guild.members.cache.filter(uye => !uye.user.bot && uye.roles.highest.position >= enAltYetkiliRolü.position && uye.voice.channel).size;
        var atkifler = message.guild.members.cache.filter(yetkili => !yetkili.user.bot && yetkili.roles.highest.position >= enAltYetkiliRolü.position && yetkili.presence && yetkili.presence.status !== "offline").size
        let sesdeolmayanlar =  message.guild.members.cache.filter(uye => !uye.user.bot && uye.roles.highest.position >= enAltYetkiliRolü.position && !uye.voice.channel && (uye.presence && uye.presence.status !== "offline")).size;
        let ramalseskontrol = message.guild.members.cache.filter(yetkili => !yetkili.user.bot && yetkili.roles.highest.position >= enAltYetkiliRolü.position).filter(yetkilises => !yetkilises.voice.channel && yetkilises.presence && yetkilises.presence.status != "offline")
        const yetkilisay = new Discord.MessageEmbed()
            .setAuthor(message.guild.name + " - Yetkili Bilgileri", message.guild.iconURL({ dynamic: true }))
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setFooter(`Created by ramal.`, message.guild.iconURL({ dynamic: true })).setTimestamp().setColor("RANDOM")
            .setDescription(`
Sunucumuzdaki toplam yetkili sayısı: **${yetkili}**
Sunucumuzdaki toplam aktif yetkili sayısı: **${atkifler}**
Sesde olmayan yetkili sayısı: **${sesdeolmayanlar}**
Sesdeki toplam yetkili sayısı: **${sesdekiler}**
`)
        button.reply({ embeds: [yetkilisay] })
        message.channel.send(`${ramalseskontrol.map(yetkili => `${yetkili}`).join(', ')}`)
    } else if (button.customId === "yetkiliptal") {

        if (msg) msg.delete().catch(err => { });
        if (message) return message.delete().catch(err => { });

    } else if (button.customId === "yetkilidm") {
        let enAltYetkiliRolü = message.guild.roles.cache.get(ayarlar.enaltyt);  
        message.guild.members.cache.filter(
        yetkili => !yetkili.user.bot && yetkili.roles.highest.position >= enAltYetkiliRolü.position).filter(yetkilises => !yetkilises.voice.channel && yetkilises.presence && yetkilises.presence.status != "offline" )
    .forEach(user => {
            user.send(`Merhabalar. **${message.guild.name}** sunucusunda ses aktifliğinizi artırmak ve yetkinizi yükseltmek için seslere giriniz. Müsait değil isen **Sleep Room** kanalına afk bırakabilirsin.`).catch(err => {
                button.reply(`${user} isimli yetkiliye özel mesajları kapalı olduğu için mesaj atamıyorum. Lütfen seslere geçebilir misin ? Müsait değilsen **Sleep Room** kanalına geçebilirsin.`)
            })
        })
    }
});
    }

exports.config = {
    name: "yetkili",
    usage: `${ayarlar.BotPrefix}yetkili`,
    guildOnly: true,
    aliases: [],
    cooldown: 3000
};