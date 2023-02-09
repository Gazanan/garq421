const Discord = require("discord.js"); 
const ayarlar = require('../../Ayarlar.json')
const sunucuayar = require("../Models/sunucuayar");


module.exports.run = async (client, message, args) => {
    let server = await sunucuayar.findOne({
        guildID: message.guild.id
    });

    if (!server.BanYetkiliRol.some(x => message.member.roles.cache.has(x)) && !message.member.roles.cache.has(server.BOTOWNER)) return
    let rolsuz = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)
    let tagolan = message.guild.members.cache.filter(s => server.TAG.some(a => s.user.tag.toLowerCase().includes(a)) && !s.roles.cache.has(`${server.CREW}`))        
    let tagolmayan =  message.guild.members.cache.filter(s => s.roles.cache.has(`${server.CREW}`) && !server.TAG.some(a => s.user.tag.toLowerCase().includes(a)))

    const row = new Discord.MessageActionRow()
    .addComponents(
      new Discord.MessageButton()
        .setCustomId('taglı')
        .setLabel("Taglı kontrol")
        .setStyle('PRIMARY'),
        new Discord.MessageButton()
        .setCustomId('rolsüz')
        .setLabel("Rolsüz kontrol")
        .setStyle('PRIMARY'),      
      new Discord.MessageButton()
        .setCustomId('CANCEL')
        .setLabel("İptal")
        .setStyle('DANGER'),
    );       
  
    const embed = new Discord.MessageEmbed()
   .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true })})
   .setColor("RANDOM")
   .setDescription(`
\`${message.guild.name}\` sunucusundaki kontrolleri yapmak için aşağıdaki buttonları kullanman yeterli olacaktır.
`)
.addFields(
{ name: "Tagı olup rolü olmayan", value: `
\`\`\`fix
${tagolan.size} kişi
\`\`\`
`, inline: true },
{ name: "Tagı olmayıp rolü olan", value: `
\`\`\`fix
${tagolmayan.size} kişi
\`\`\`
`, inline: true },
{ name: "Hiç Bir Rolü bulunmayan", value: `
\`\`\`fix
${rolsuz.size} kişi
\`\`\`
`, inline: true }
)  

let msg = await message.reply({ embeds: [embed], components: [row] })
var filter = (button) => button.user.id === message.author.id;
const collector = msg.createMessageComponentCollector({ filter, time: 30000 })

collector.on("collect", async (button) => {
  if(button.customId === "taglı") {
      row.components[0].setDisabled(true);
      msg.edit({ components: [row] })

    message.guild.members.cache.filter(s => server.TAG.some(a => s.user.tag.toLowerCase().includes(a)) && !s.roles.cache.has(server.CREW)).map(x=> x.roles.add(server.CREW))                
    message.guild.members.cache.filter(s => s.roles.cache.has(`${server.CREW}`) && !server.TAG.some(a => s.user.tag.toLowerCase().includes(a))).map(x=> x.roles.remove(server.CREW) )
   button.reply(`Tagı olup rolü olmayan ${tagolan.size} kişiye taglı rolünü verdim. Tagı olmayıp rolü olan ${tagolmayan.size} kişiden taglı rolünü aldım.`)

  }  else if(button.customId === "rolsüz") {
    row.components[1].setDisabled(true);
    msg.edit({ components: [row] })
    rolsuz.forEach(r => {
        r.roles.add(server.UNREGISTER)
    })
    button.reply(`Sunucuda herhangi bir role sahip olmayan ${rolsuz.size} kişiye kayıtsız rolünü verdim.`)
  } else if(button.customId === "CANCEL") {
    row.components[0].setDisabled(true);
    row.components[1].setDisabled(true);
    row.components[2].setDisabled(true);
    msg.edit({ components: [row] })
    button.reply("İşlem iptal edildi!")

  }
})

}


exports.config = {
    name: "kontrol",
    usage: `${ayarlar.BotPrefix}kontrol`,
    guildOnly: true,
    aliases: ["kontrol"],
    cooldown: 3000
};




