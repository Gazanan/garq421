const ayarlar = require('../../Ayarlar.json')

module.exports.run = async (client, message, args, embed, prefix) => {
	if (!message.guild) return;
let user = args.length > 0 ? message.mentions.users.first() || await client.users.fetch(args[0]) || message.author : message.author
message.reply(`${user.tag} ${user.displayAvatarURL({ dynamic: true, size: 4096 })}`)

  };

  exports.config = {
    name: "avatar",
    usage: `${ayarlar.BotPrefix}avatar (@ramal/ID)`,
    guildOnly: true,
    aliases: ["avatar","av"],
    cooldown: 3000
  }; 