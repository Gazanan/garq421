const Discord = require("discord.js");
const ayarlar = require('../../Ayarlar.json')
const {Cevap, Register} = require('../helpers/functions.js');
const modsData = require('../Models/Mods.js')
const sunucuayar = require("../Models/sunucuayar");
const moment = require("moment");
require("moment-duration-format"); moment.locale("tr");

module.exports.run = async(client, message, args, embed) => {
    let data = await sunucuayar.findOne({
        guildID: message.guild.id
    });
    let ManRol = data.MAN;
    let WomanRol = data.WOMAN;
    let unRegisterRol = data.UNREGISTER;
    let Tag = data.TAG;
    let Vip = data.VIP;
    let Booster = data.BOOSTER;
    let Chat = data.CHAT;
    let KadınLog = data.KADINLOG;

if(!Register.checkPerms(message.member)) return Cevap.yetki(message)
let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
args = args.filter(a => a !== "" && a !== " ").splice(1)
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase() + arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || undefined;
    if(!member) return message.reply({embeds: [embed.setDescription(`${message.member}, Bir kullanıcı belirtmelisin. `)]}).sil(7);
    var name = Register.fixname(member, isim, yaş);
    if(name.length > 32) return message.reply({embeds: [embed.setDescription(`${message.member}, İsim 32 karakterden fazla olamaz!`)]}).sil(7)

    if(member.user.bot) return message.reply({embeds: [embed.setDescription(`${message.member}, Kayıt ettiğin kullanıcı bir bot olamaz!`)]}).sil(7);
    if(member.user.id == message.member.id) return message.reply({embeds: [embed.setDescription(`${message.member}, Kendini kayıt edemezsin!`)]}).sil(7);
    if(member.user.id == message.guild.ownerId) return message.reply({embeds: [embed.setDescription(`${message.member}, Sunucu sahibini kayıt edemezsin!`)]}).sil(7);
    if(member.roles.highest.position >= message.member.roles.highest.position) return message.reply({embeds: [embed.setDescription(`${message.member}, Bu kullanıcı sizden üst/aynı pozisyonda.`)]}).sil(7);
   if(ManRol.some(s => member.roles.cache.has(s)) || WomanRol.some(x => member.roles.cache.has(x))) return message.reply({embeds: [embed.setDescription(`${message.member}, Bu kullanıcı zaten kayıtlı.`)]}).sil(7);
   if(!unRegisterRol.some(s => member.roles.cache.has(s))) return message.reply({embeds: [embed.setDescription(`${message.member}, Kullanıcıda kayıtsız rolü bulunmadığı için işlem gerçekleştirilemedi.`)]}).sil(7);
 
   let data1 = await modsData.findOne({guildID: message.guild.id});
   if(data1.tagMode == true) {
       if(Tag.some(x => member.user.username.includes(x) || member.user.discriminator.includes(x)  || member.roles.cache.has(Vip) || member.roles.cache.has(Booster))) {
        await Register.Woman(member, message.member, name, message.channel)

       }  else {
         return  message.reply({embeds: [embed.setDescription(`${message.member}, Kullanıcıda tag bulunmadığı için kayıt işlemi gerçekleştirilemedi.`)]}).sil(7)}
   } else {
    await Register.Woman(member, message.member, name, message.channel)
   }
   client.channels.cache.get(Chat).send(`${member.user} aramıza katıldı.`).catch(e => { });
   client.channels.cache.get(KadınLog).wsend({ embeds: [embed.setDescription(`Kayıt Eden: ${message.author} - (\`${message.author.id}\`) \nKayıt Olan: ${member.user} - (\`${member.user.id}\`) \nKayıt Olma Tarihi: \`${moment(Date.now()).format("LLL")}\` \nVerilen Roller: ${WomanRol.map(x => `<@&${x}>`)}`)]}).catch(e => { });


};
exports.config = {
    name: "kadın",
    usage: `${ayarlar.BotPrefix}kız [@ramal/ID] (Name) (Age)`,
    guildOnly: true,
    aliases: ["kız","k","woman"],
    cooldown: 3000
};
