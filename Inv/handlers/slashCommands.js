const fs = require('fs');
const client = global.client;
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const ayarlar = require('../../Ayarlar.json')
const rest = new REST({ version: '9' }).setToken(ayarlar.Token);
const commands = [];
const commandFiles = fs.readdirSync('./Inv/Commands');
commandFiles.filter(files => !files.endsWith('.js') && files.toString() == "SlashCmd").forEach(files => {
    fs.readdirSync(`./Inv/Commands/${files}`).forEach(file => {
        if (!file.endsWith('.js')) return;
        const command = require(`../Commands/${files}/` + file);
        commands.push(command.data.toJSON());
        client.slashCommands.set(command.data.name, command);
    })
})

rest.put(Routes.applicationGuildCommands(ayarlar.BotId, ayarlar.guildID), { body: commands })
    .then(() => console.log(`[SlashCMD] ${commands.length} Komut çalıştırıldı!`))
    .catch(console.error);