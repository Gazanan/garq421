const conf = require("../configs/config.json");
const messageUser = require("../schemas/messageUser");
const messageGuild = require("../schemas/messageGuild");
const guildChannel = require("../schemas/messageGuildChannel");
const userChannel = require("../../../Executive/Models/messageUserChannel");
const { MessageEmbed } = require("discord.js");
const coin = require("../../../Executive/Models/coin");
const client = global.client;
const nums = new Map();
const ayarlar = require('../../../Ayarlar.json')

/**
 * @param message
 * @returns {Promise<void>}
 */
module.exports = async (message) => {
  const prefix = ayarlar.BotPrefix.find((x) => message.content.toLowerCase().startsWith(x));
  if (message.author.bot || !message.guild || prefix) return;
  await messageUser.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { topStat: 1, dailyStat: 1, weeklyStat: 1, twoWeeklyStat: 1 } }, { upsert: true });
  await messageGuild.findOneAndUpdate({ guildID: message.guild.id }, { $inc: { topStat: 1, dailyStat: 1, weeklyStat: 1, twoWeeklyStat: 1 } }, { upsert: true });
  await guildChannel.findOneAndUpdate({ guildID: message.guild.id, channelID: message.channel.id }, { $inc: { channelData: 1 } }, { upsert: true });
  await userChannel.findOneAndUpdate({ guildID: message.guild.id,  userID: message.author.id, channelID: message.channel.id }, { $inc: { channelData: 1 } }, { upsert: true });
};

module.exports.conf = {
  name: "messageCreate",
};
