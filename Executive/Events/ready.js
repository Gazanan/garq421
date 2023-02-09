const Discord = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");
const ayarlar = require('../../Ayarlar.json')
const modsData = require('../Models/Mods');
module.exports = async client => {
    let data = await modsData.findOne({guildID: ayarlar.guildID})
    if(!data) await new modsData({guildID: ayarlar.guildID, tagMode: false, nameMode:false}).save();
    console.log('=> Moderation System Hazır Halde ✔')
    client.user.setActivity(ayarlar.BotDurum);
    client.user.setStatus('online');

    const VoiceChannel = client.channels.cache.get(ayarlar.BotSes);
    joinVoiceChannel({
        channelId: VoiceChannel.id,
        guildId: VoiceChannel.guild.id,
        adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
        selfDeaf: true
    });
    
};
