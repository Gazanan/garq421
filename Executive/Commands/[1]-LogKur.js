const Discord = require("discord.js"); 
const ayarlar = require('../../Ayarlar.json')

module.exports.run = async (client, message, args, embed) => {

    if(!ayarlar.BotOwner.includes(message.author.id)) return
    const parent = await message.guild.channels.create('Guild Logs', { type: 'GUILD_CATEGORY' });
    await message.guild.channels.create('tag-log', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('message-log', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('voice-log', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('invite-log', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('kayıt-log', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('transporter-log', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('commands-log', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('guard', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('yetkim-yetmedi', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('ban-log', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('jail-log', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('voice-mute-log', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('chat-mute-log', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('ceza-puan-log', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('rol-log', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('ozel-oda-log', { type: 'GUILD_TEXT', parent: parent.id });
    message.channel.send(`${ayarlar.green} Bot loglarının kurulumu başarıyla tamamlanmıştır.`)
  }
exports.config = {
    name: "log",
    usage: `${ayarlar.BotPrefix}log-kur`,
    guildOnly: true,
    aliases: ["logkur"],
    cooldown: 3000
};


