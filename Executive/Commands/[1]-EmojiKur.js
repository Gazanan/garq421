const Discord = require("discord.js"); 
const ayarlar = require('../../Ayarlar.json')

module.exports.run = async (client, message, args, embed) => {

    if(!ayarlar.BotOwner.includes(message.author.id)) return
    if(args[0] === "kur" || args[0] === "kurulum") {

        let ramal_arama = "https://cdn.discordapp.com/emojis/945451410869350400.webp?size=96&quality=lossless";
        let ramal_chat = "https://cdn.discordapp.com/emojis/946169889876508733.gif?size=96&quality=lossless";
        let ramal_red = "https://cdn.discordapp.com/emojis/849895346774999070.gif?size=96&quality=lossless";
        let ramal_yes = "https://cdn.discordapp.com/emojis/849895367860682762.gif?size=96&quality=lossless";
        let ramal_voice = "https://cdn.discordapp.com/emojis/946169890547568730.webp?size=44&quality=lossless";
    
        message.guild.emojis.create(ramal_arama, "ramal_arama").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
        message.guild.emojis.create(ramal_chat, "ramal_chat").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
        message.guild.emojis.create(ramal_red, "ramal_red").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
        message.guild.emojis.create(ramal_yes, "ramal_yes").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
        message.guild.emojis.create(ramal_voice, "ramal_voice").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);    
        return;
    }
  }

exports.config = {
    name: "emoji",
    usage: `${ayarlar.BotPrefix}emoji`,
    guildOnly: true,
    aliases: ["emoji"],
    cooldown: 3000
};
