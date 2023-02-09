const { Client, Collection, Intents } = require("discord.js");
const client = (global.client = new Client({
	fetchAllMembers: true,
	intents: [
    Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
		Intents.FLAGS.GUILD_VOICE_STATES,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS
	]
}));
const ayarlar = require('../Ayarlar.json')
const { Database } = require("ark.db");
global.confdb = new Database("./src/configs/config.json");
client.commands = new Collection();
client.cooldown = new Map();

require("./src/handlers/commandHandler");
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);


	client
	.login(ayarlar.Token)
	.then(() => console.log("=> Stat System Hazır Halde ✔"))
	.catch(() => console.log("[BOT] Bot can't connected!"));
