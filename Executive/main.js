const { Client, Collection, MessageEmbed, Partials, GatewayIntentBits } = require("discord.js"); 
const Discord = require("discord.js")
const client = new Client({
  partials: [
    Partials.Message, // for message
    Partials.Channel, // for text channel
    Partials.GuildMember, // for guild member
    Partials.Reaction, // for message reaction
    Partials.GuildScheduledEvent, // for guild events
    Partials.User, // for discord user
    Partials.ThreadMember, // for thread member
  ],
  intents: [
    GatewayIntentBits.Guilds, // for guild related things
    GatewayIntentBits.GuildMembers, // for guild members related things
    GatewayIntentBits.GuildBans, // for manage guild bans
    GatewayIntentBits.GuildEmojisAndStickers, // for manage emojis and stickers
    GatewayIntentBits.GuildIntegrations, // for discord Integrations
    GatewayIntentBits.GuildWebhooks, // for discord webhooks
    GatewayIntentBits.GuildInvites, // for guild invite managing
    GatewayIntentBits.GuildVoiceStates, // for voice related things
    GatewayIntentBits.GuildPresences, // for user presence things
    GatewayIntentBits.GuildMessages, // for guild messages things
    GatewayIntentBits.GuildMessageReactions, // for message reactions things
    GatewayIntentBits.GuildMessageTyping, // for message typing things
    GatewayIntentBits.DirectMessages, // for dm messages
    GatewayIntentBits.DirectMessageReactions, // for dm message reaction
    GatewayIntentBits.DirectMessageTyping, // for dm message typinh
    GatewayIntentBits.MessageContent, // enable if you need message content things
  ],
});
const ayarlar = require('../Ayarlar.json')
const fs = require("fs");
require('./util/Loader.js')(client);
const moment = require('moment');
moment.locale('tr');
const mongoose = require('mongoose');
mongoose.connect(ayarlar.Mongo, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }).then(m => setTimeout(() => { console.log('Database bağlandı!') }, 3000)).catch(err => setTimeout(() => { console.log('Database bağlanamadı!!') }, 3000));
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.invites = new Collection();

fs.readdir('./Executive/Commands/', (err, files) => {
    if (err) console.error(err);
    console.log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./Commands/${f}`);
        console.log(`${props.config.name} komutu yüklendi.`);
        client.commands.set(props.config.name, props);
        props.config.aliases.forEach(alias => {
            client.aliases.set(alias, props.config.name);
        });
    });
})
require("./helpers/functionHandler")(client);
client.login(ayarlar.Token).catch(err => { console.log('Bota giriş yapılırken başarısız olundu!!') })

client.on("messageCreate", async message => {
    if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(ayarlar.BotPrefix)) return;
    if (!ayarlar.BotOwner.includes(message.author.id) && message.author.id !== message.guild.ownerId) return;
    let args = message.content.split(' ').slice(1);
    let command = message.content.split(' ')[0].slice(ayarlar.BotPrefix.length);
    //let embed = new Discord.MessageEmbed().setColor("#00ffdd").setAuthor({text: message.author.tag, url:  message.author.avatarURL({ dynamic: true, })}).setFooter({text: `Created by ramal.`}).setTimestamp();
    
    // Eval
    if (command === "eval" && ayarlar.BotOwner.includes(message.author.id)) {
      if (!args[0]) return message.channel.send(`Kod belirtilmedi`);
        let code = args.join(' ');
        function clean(text) {
        if (typeof text !== 'string') text = require('util').inspect(text, { depth: 0 })
        text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
        return text;
      };
      try { 
        var evaled = clean(await eval(code));
        if(evaled.match(new RegExp(`${client.token}`, 'g'))) evaled.replace(client.token, "Yasaklı komut");
        message.channel.send({content: `
        
        \`\`\`${evaled.replace(client.token, "Yasaklı komut")}\`\`\`
        `, code: "js", split: true});
      } catch(err) { message.channel.send({content: `${err}`, code: 'js', split: true})
    }
}
})
const sunucuayar = require("./Models/sunucuayar"); 


client.on("message", async message => {
  const data = await sunucuayar.findOne({ guildID: ayarlar.guildID })
  if(message.content.toLowerCase() == "tagges") 
  return message.channel.send((`\`\`\`${data.TAG}\`\`\``))
});

client.on("message", async message => {
  const data = await sunucuayar.findOne({ guildID: ayarlar.guildID })
if(message.content.toLowerCase() == ".tag") 
  return message.channel.send((`\`\`\`${data.TAG}\`\`\``))
});

client.on("message", async message => {
  const data = await sunucuayar.findOne({ guildID: ayarlar.guildID })
  if(message.content.toLowerCase() == "tag") 
  return message.channel.send((`\`\`\`${data.TAG}\`\`\``))
});

client.on("message", async message => {
  const data = await sunucuayar.findOne({ guildID: ayarlar.guildID })
  if(message.content.toLowerCase() == "!tag") 
  return message.channel.send((`\`\`\`${data.TAG}\`\`\``))
});

client.on("message", async  message => {
  const data = await sunucuayar.findOne({ guildID: ayarlar.guildID })
  if(message.content.toLowerCase() == "u-tag") 
  return message.channel.send((`\`\`\`${data.TAG}\`\`\``))
});


  client.on("guildMemberAdd", async member => {
 const data = await sunucuayar.findOne({ guildID: ayarlar.guildID })
    if(!member) return;
    if (data.TAG.some(s => member.user.username.includes(s) || member.user.discriminator.includes(s) || member.user.tag.includes(s))) await member.roles.add(data.CREW).catch(e => {})
   let isMemberFake = (Date.now() - member.user.createdTimestamp) < 7*24*60*60*1000;
    
    if (isMemberFake) {
        let olusturma = `(\`${moment.duration(Date.now() - member.user.createdTimestamp).locale('tr').format('Y [yıl], M [Ay], D [Gün]')}\`)`
        await member.roles.set([data.SUSPECİOUS]).catch(e => {});
  await member.setNickname(data.SUSPECİOUSNAME).catch(e => {});
  let channel = client.channels.cache.get(data.REGISTER)
  
      
  if(channel) channel.send(`
  ${member}, Adlı kullanıcı sunucuya katıldı fakat hesabı yeni olduğu için şüpheli hesap rolünü verdim. ${olusturma}`);
    
        
      
    } else {
          member.roles.add(data.UNREGISTER).catch(e => {});
               member.setNickname(ayarlar.defaultName).catch(e => {});
      
             client.channels.cache.get(data.REGISTER).send(`
🎉 ${member} Sunucumuza hoş geldin. 
                  
Seninle beraber sunucumuz  **${member.guild.memberCount}**. kişiye ulaştı.Hesabın **${moment(member.user.createdTimestamp).locale('tr').format('LLL')}** tarihinde (\`${moment.duration(Date.now() - member.user.createdTimestamp).locale('tr').format('Y [yıl], M [Ay], D [Gün]')}\`) önce oluşturulmuş.
 
Kayıt olduktan sonra ${client.channels.cache.get(data.RULES)} kanalını okuduğunuzu kabul edeceğiz ve içeride yapılacak cezalandırma işlemlerini bunu göz önünde bulundurarak yapacağız.`)
          
    }
  });

  ///////////////////////////////////////////////
  client.on("messageDelete", async message => {
    const data = await sunucuayar.findOne({ guildID: ayarlar.guildID })
    //console.log(message)
      if (!message || message.partial) return
      if (typeof message.author === "undefined" ) return
      if (message.author && message.author.bot === true) return
      if (message.channel && message.channel.type !== "GUILD_TEXT") return
      // validate if it's from a guild

      let channel2 = client.channels.cache.get(data.MESSAGELOG)
      const messageDeletedEmbed = new MessageEmbed()
          .setColor("RANDOM")
          .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
          let user = message.author
          let avatar = user.displayAvatarURL({dynamic: true, size: 1024})
      var messageHadAttachment = message.attachments.map(x => x.proxyURL)[0]
      if (messageHadAttachment) { // if there is an attachement
          messageDeletedEmbed.setDescription(` <@${message.author.id}> üyesi <#${message.channel.id}> kanalında mesajını sildi. 
          
          **__silinen mesaj:__**
          silinen mesaj yoktur.
          
          **__silinen resim:__**
          ${message.attachments.map(x => x.proxyURL)}
  
  \`\`\`
Kanal: ${message.channel.name}  (${message.channel.id})
Kullanıcı: ${message.author.tag}  (${message.author.id})
Mesaj ID: ${message.id}
Atılma Tarihi: ${moment(message.createdAt).locale("tr").format('LLL')} \`\`\``)
           }
          else {
            messageDeletedEmbed.setDescription(` <@${message.author.id}> üyesi <#${message.channel.id}> kanalında mesajını sildi. 
          
            **__silinen mesaj:__**
            ${message.content.replace(/`/g, "'")}
  
            **__silinen resim:__**
            Silinen resim yoktur.
            
  \`\`\`
Kanal: ${message.channel.name}  (${message.channel.id})
Kullanıcı: ${message.author.tag}  (${message.author.id})
Mesaj ID: ${message.id}
Atılma Tarihi: ${moment(message.createdAt).locale("tr").format('LLL')}\`\`\``)
          }
          if(avatar.endsWith(".gif?size=1024")){
            messageDeletedEmbed.setThumbnail(message.author.avatarURL({ dynamic: true, format: 'gif', size: 1024 }))
          } else {
            messageDeletedEmbed.setThumbnail(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
          }
       return channel2.send({ 
         embeds: [messageDeletedEmbed]
         }) // ({embeds: [embed]}) (messageDeletedEmbed)
    });
///////////////////////////////////////////////
client.on("messageUpdate", async (oldMessage, newMessage) => {
  const data = await sunucuayar.findOne({ guildID: ayarlar.guildID })
  if (oldMessage.author.bot === true) return
  if (oldMessage.channel.type !== "GUILD_TEXT") return
  if (newMessage.channel.type !== "GUILD_TEXT") return
  if (oldMessage.content === newMessage.content) return
const messageEditedEmbed = new MessageEmbed()
.setColor("RANDOM")
.setAuthor(newMessage.author.username, newMessage.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))

.setDescription(` <@${newMessage.author.id}> üyesi <#${newMessage.channel.id}> kanalında mesajını düzenledi. 

**Düzenlenmeden Önce:**
${oldMessage.content.replace(/`/g, "'")}

**Düzenlenlendikten Sonra:**
${newMessage.content.replace(/`/g, "'")}

\`\`\`
Kanal: ${newMessage.channel.name}  (${newMessage.channel.id})
Kullanıcı: ${newMessage.author.tag}  (${newMessage.author.id})
Mesaj ID: ${newMessage.id}
Atılma Tarihi: ${moment(oldMessage.createdAt).locale("tr").format('LLL')}\`\`\``)
  let user = newMessage.author
  let avatar = user.displayAvatarURL({dynamic: true, size: 1024})
  if(avatar.endsWith(".gif?size=1024")){
    messageEditedEmbed.setThumbnail(newMessage.author.avatarURL({ dynamic: true, format: 'gif', size: 1024 }))
  } else {
    messageEditedEmbed.setThumbnail(newMessage.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
  }

return client.channels.cache.get(data.MESSAGELOG).send({ 
  embeds: [messageEditedEmbed]
  })
});
///////////////////////////////////////////////////////////////////////////////////////////////////
client.on('voiceStateUpdate', async (oldState, newState) => {

  const data = await sunucuayar.findOne({ guildID: ayarlar.guildID })
  if (!oldState.channelId && newState.channelId) { 
    //  let users = newState.guild.members.cache.get(newState.id)
      let member = newState.guild.members.cache.get(newState.id)
      let microphone = member.voice.selfMute ? "kapalı" : "açık";
      let headphones = member.voice.selfDeaf ? "kapalı" : "açık";
      //console.log()
      let SesMicEmbed = new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(newState.member.user.username, newState.member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
    .setThumbnail(newState.member.user.displayAvatarURL({ dynamic: true}))
    .setDescription(`
    <@${newState.member.user.id}> üyesi <#${newState.channel.id}> kanalına giriş yaptı.
    
**Kanala girdiği anda:**
\`•\` Mikrofon durumu: \`${microphone}\`. 
\`•\` Kulaklık durumu: \`${headphones}\`.

\`\`\`
Giridiği kanal: ${newState.channel.name}
(${newState.channelId})
Kullanıcı: ${newState.member.user.tag}
(${newState.member.user.id})
Eylem Gerçekleşme: ${moment(newState.createdAt).locale("tr").format('LLL')}\`\`\`   
Girdiği kanalda bulunan üyeler:
${newState.channel.members.map(x => `${x.user} - \`${x.user.id}\``).join("\n")}
    `)   
    client.channels.cache.get(data.VOICELOG).send({ 
      embeds: [SesMicEmbed]
      })
  } 
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////
client.on('voiceStateUpdate', async (oldState, newState) => {
  const data = await sunucuayar.findOne({ guildID: ayarlar.guildID })
  //console.log("sa") 
  if (oldState.channelId && newState.channelId && oldState.channel && newState.channel) {
    if (oldState.channelId !== newState.channelId) {
    //console.log("sam")
    let member = newState.guild.members.cache.get(newState.id);
          let microphone = member.voice.selfMute ? "kapalı" : "açık";
          let headphones = member.voice.selfDeaf ? "kapalı" : "açık";
          if(oldState.channel.members.map(x => x)[0]){
            var makro = oldState.channel.members.map(x => `${x.user} - \`${x.user.id}\``).join("\n")
          } else {
            var makro = "Maalesef bu kanalda üye bulunmamaktadır.";
          }
          let SesMicEmbed1 = new MessageEmbed()
          .setColor("RANDOM")
          .setAuthor(oldState.member.user.username, oldState.member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
          .setThumbnail(oldState.member.user.displayAvatarURL({ dynamic: true}))
          .setDescription(`
<@${oldState.member.user.id}> üyesi <#${oldState.channel.id}> kanalından <#${newState.channel.id}> kanalına geçiş yaptı.

**Kanal Değiştirdiği Anda:**
          \`•\` Mikrofon durumu: \`${microphone}\`. 
          \`•\` Kulaklık durumu: \`${headphones}\`.

          \`\`\`
Çıktığı kanal: ${oldState.channel.name}
(${oldState.channelId})
Kullanıcı: ${oldState.member.user.tag}
(${oldState.member.user.id})
Eylem Gerçekleşme: ${moment(oldState.createdAt).locale("tr").format('LLL')}\`\`\`

Eski Kanalında Bulunan Üyeler:
${makro}

Yeni Kanalında Bulunan Üyeler:        
${newState.channel.members.map(x => `${x.user} - \`${x.user.id}\``).join("\n")}
`)   
client.channels.cache.get(data.VOICELOG).send({ 
              embeds: [SesMicEmbed1]
              })
  }}
});


client.on("userUpdate", async function(oldUser, newUser) {
  const data = await sunucuayar.findOne({ guildID: ayarlar.guildID })
  const tag = "Wio"//tag
  const tagg = "WIO"
  const taggg = "wio"
  const tagggg = ","
  const taggggg = "1924"
 

  const guild = client.guilds.cache.get(ayarlar.guildID)
  const member = guild.members.cache.get(newUser.id)
  const embed = new Discord.MessageEmbed().setColor('#ff0000').setTimestamp();
  
      if (newUser.username !== oldUser.username) {
    if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {

      client.channels.cache.get(data.TAGLOG).send(` ${newUser} isminden \`${tag}\` çıkartarak ailemizden ayrıldı! \n\nÖnceki İsmi: **${oldUser.tag}**\nYeni İsmi: **${newUser.tag}** <@&1001944006143508490>`)
       } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
        member.roles.add(data.CREW)
            client.channels.cache.get(data.CHAT).send(`Tebrikler, ${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.(${tag})\nYeni ismine tagımız çok yakıştı **${newUser.tag}**`).sil(7)
            client.channels.cache.get(data.TAGLOG).send({embeds: [embed.setDescription(`${newUser} kişisi \`${tag}\` tagımızı alarak ailemize katıldı. \n\nÖnceki İsmi: **${oldUser.tag}**\nYeni İsmi: **${newUser.tag}**`)] })
    }
    if (oldUser.username.includes(tagg) && !newUser.username.includes(tagg)) {

    client.channels.cache.get(data.TAGLOG).send(` ${newUser} isminden \`${tagg}\` çıkartarak ailemizden ayrıldı! \n\nÖnceki İsmi: **${oldUser.tag}**\nYeni İsmi: **${newUser.tag}** <@&1001944006143508490>`)
    } else if (!oldUser.username.includes(tagg) && newUser.username.includes(tagg)) {
        member.roles.add(data.CREW)
            client.channels.cache.get(data.CHAT).send(`Tebrikler, ${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.(${tagg})\nYeni ismine tagımız çok yakıştı **${newUser.tag}**`).sil(7)
            client.channels.cache.get(data.TAGLOG).send({embeds: [embed.setDescription(`  ${newUser} kişisi \`${tagg}\` tagımızı alarak ailemize katıldı. \n\nÖnceki İsmi: **${oldUser.tag}**\nYeni İsmi: **${newUser.tag}**`)] })
    }
    if (oldUser.username.includes(taggg) && !newUser.username.includes(taggg)) {

      client.channels.cache.get(data.TAGLOG).send(` ${newUser} isminden \`${taggg}\` çıkartarak ailemizden ayrıldı! \n\nÖnceki İsmi: **${oldUser.tag}**\nYeni İsmi: **${newUser.tag}** <@&1001944006143508490>`)
    } else if (!oldUser.username.includes(taggg) && newUser.username.includes(taggg)) {
        member.roles.add(data.CREW)
            client.channels.cache.get(data.CHAT).send(`Tebrikler, ${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.(${taggg})\nYeni ismine tagımız çok yakıştı **${newUser.tag}**`).sil(7)
            client.channels.cache.get(data.TAGLOG).send({embeds: [embed.setDescription(`  ${newUser} kişisi \`${taggg}\` tagımızı alarak ailemize katıldı. \n\nÖnceki İsmi: **${oldUser.tag}**\nYeni İsmi: **${newUser.tag}**`)] })
    }
    if (oldUser.username.includes(tagggg) && !newUser.username.includes(tagggg)) {

      client.channels.cache.get(data.TAGLOG).send(` ${newUser} isminden \`${tagggg}\` çıkartarak ailemizden ayrıldı! \n\nÖnceki İsmi: **${oldUser.tag}**\nYeni İsmi: **${newUser.tag}** <@&1001944006143508490>`)
    } else if (!oldUser.username.includes(tagggg) && newUser.username.includes(tagggg)) {
        member.roles.add(data.CREW)
            client.channels.cache.get(data.CHAT).send(`Tebrikler, ${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.(${tagggg})\nYeni ismine tagımız çok yakıştı **${newUser.tag}**`).sil(7)
            client.channels.cache.get(data.TAGLOG).send({embeds: [embed.setDescription(`  ${newUser} kişisi \`${tagggg}\` tagımızı alarak ailemize katıldı. \n\nÖnceki İsmi: **${oldUser.tag}**\nYeni İsmi: **${newUser.tag}**`)] })
    }
     if (oldUser.username.includes(taggggg) && !newUser.username.includes(taggggg)) {

      client.channels.cache.get(data.TAGLOG).send(` ${newUser} isminden \`${taggggg}\` çıkartarak ailemizden ayrıldı! \n\nÖnceki İsmi: **${oldUser.tag}**\nYeni İsmi: **${newUser.tag}** <@&1001944006143508490>`)
    } else if (!oldUser.username.includes(taggggg) && newUser.username.includes(taggggg)) {
        member.roles.add(data.CREW)
            client.channels.cache.get(data.CHAT).send(`Tebrikler, ${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.(${taggggg})\nYeni ismine tagımız çok yakıştı **${newUser.tag}**`).sil(7)
            client.channels.cache.get(data.TAGLOG).send({embeds: [embed.setDescription(`  ${newUser} kişisi \`${taggggg}\` tagımızı alarak ailemize katıldı. \n\nÖnceki İsmi: **${oldUser.tag}**\nYeni İsmi: **${newUser.tag}**`)] })
    }      
}
   if (newUser.discriminator !== oldUser.discriminator) {
        if (oldUser.discriminator == "1924" && newUser.discriminator !== "1924") {
    
            client.channels.cache.get(data.TAGLOG).send(` ${newUser} etiketinden **1924** çıkartarak ailemizden ayrıldı! \n\nÖnceki İsmi: **${oldUser.tag}**\nYeni İsmi: **${newUser.tag}** <@&1001944006143508490>`)
        } else if (oldUser.discriminator !== "1924" && newUser.discriminator == "1924") {
            member.roles.add(data.CREW)
            client.channels.cache.get(data.TAGLOG).send({embeds: [embed.setDescription(`  ${newUser} etiketine **1924** alarak ailemize katıldı. \n\nÖnceki İsmi: **${oldUser.tag}**\nYeni İsmi: **${newUser.tag}**`)] })
            client.channels.cache.get(data.CHAT).send(`Tebrikler, ${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.(#1924)\nYeni ismine tagımız çok yakıştı **${newUser.tag}**`).sil(7)
        }
    }
  
  })

  client.on("message", async (message) => {
    const data = await sunucuayar.findOne({ guildID: ayarlar.guildID })
    if (message.author.bot) return;
    const prefixes = ayarlar.BotPrefix;
    let prefix = prefixes.filter(p => message.content.startsWith(p))[0];
    if (!prefix) return;
    let yazilanKomut = message.content.split(" ")[0];
    yazilanKomut = yazilanKomut.slice(prefix.length);
    if (!yazilanKomut) return;
    client.channels.cache.get(data.KOMUTLOG).send(`:wrench: **${message.author.tag}** (\`${message.author.id}\`) üyesi ${message.channel} kanalında bir komut kullandı: \`${prefix + yazilanKomut}\``)
  })

  const registerData = require("./Models/Register")
  const ceza = require("./Models//ceza");
  const cezapuan = require("./Models/cezapuan")
  const inviteMember = require("../Inv/models/invite")
  const Inviter = require("../Inv/models/invite");
  const messageUserChannel = require("./Models/messageUserChannel");
 const voiceUserChannel = require("../Stat/src/schemas/voiceUserChannel");
 const voiceUserParent = require("../Stat/src/schemas/voiceUserParent");

  const messageGuild = require("../Stat/src/schemas/messageGuild");
  const messageGuildChannel = require("../Stat/src/schemas/messageGuildChannel");
  const voiceGuild = require("../Stat/src/schemas/voiceGuild");
 const voiceGuildChannel = require("../Stat/src/schemas/voiceGuildChannel");
 const messageUser = require("../Stat/src/schemas/messageUser");
const voiceUser = require("../Stat/src/schemas/voiceUser");
  client.on("interactionCreate", async (button) => {
    if (!button.isButton()) return;
    if (button.customId === "katilma") {
      button.reply({ content: `Sunucuya Katılma Tarihiniz: \`${moment(button.member.joinedAt).format("LLL")}\``, ephemeral: true });
    }
    if (button.customId === "isim") {
      let data = await registerData.find({guildID: ayarlar.guildID, userID: button.member.id});
      const embed = new MessageEmbed()
      let mapped = data.length > 0 ? data.map((value, index) => `\`${index +1}.\` **${value.Name}**`).join('\n') : "Veri bulunamadı!"
      button.reply({embeds: [embed.setDescription(`İsim Geçmişiniz:\n
      ${mapped}`)], ephemeral: true });
    }
    if (button.customId === "cezalar") {
      const cezaData = await ceza.findOne({ guildID: ayarlar.guildID, userID: button.member.id });
      let cezapuanData = await cezapuan.findOne({ guildID: ayarlar.guildID, userID: button.member.user.id });
      const embed = new MessageEmbed()
      button.reply({embeds: [embed.setDescription(`Toplam Ceza Puanınız: \`${cezapuanData ? cezapuanData.cezapuan : 0}\` \nÜzerinizde Uygulanan Toplam Ceza İşlemleri: \`${cezaData ? cezaData.ceza.length : 0}\``)], ephemeral: true });
    }
    if (button.customId === "ceza") {
      const penals = require("./Models/penals");
      const cezaadata  = require("./Models/penals");
      const cezaData = await ceza.findOne({ guildID: ayarlar.guildID, userID: button.member.id });
    const cezapuanData = await cezapuan.findOne({ guildID: ayarlar.guildID, userID: button.member.user.id });
    
     let datas = await penals.find({ guildID: ayarlar.guildID, userID: button.member.id, active: true}).sort({ date: -1 });
      datas = datas.map((x) => `Ceza Numarası: \`#${x.id}:\` Ceza Durumu: ${x.active ? "\`Aktif\`" : "\`Pasif\`"} Ceza Türü: [\`${x.type}\`]\n\nCezayı Uygulayan Yetkili: <@${x.staff}>  Ceza Başlangıç Süresi: **${moment(x.date).format("LLL")}** Ceza Bitiş Tarihi: **${moment(x.finishDate).format("LLL")}**`);
    const embed = new MessageEmbed()
    if (datas.length === 0) return button.reply({ embeds: [embed.setDescription(`${button.member.toString()} üyesinin aktif cezası bulunmamaktadır.`)], ephemeral: true });
    if (datas.length > 0) return button.reply({ embeds: [embed.setDescription(`${datas}`)], ephemeral: true });
 
    
    }
    if (button.customId === "roller") {
    const embed = new MessageEmbed()
    button.reply({ embeds: [embed.setDescription(`Üzerinde Bulunan Rollerin Listesi;
        
    ${(button.member.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? button.member.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(', ') : 'Hiç yok.')}`)], ephemeral: true });
    }
    if (button.customId === "tarih") {
      const embed = new MessageEmbed()
      button.reply({ embeds: [embed.setDescription(`Hesabınızın Açılış Tarihi :  \`${moment(button.member.user.createdAt).format("LLL")}\``)], ephemeral: true });
    }
        if (button.customId === "davetler") {
    const data = await Inviter.findOne({ guildID: ayarlar.guildID, userID: button.member.user.id });
    const total = data ? data.total : 0;
    const regular = data ? data.regular : 0;
    const bonus = data ? data.bonus : 0;
    const leave = data ? data.leave : 0;
    const fake = data ? data.fake : 0;
    const invMember = await inviteMember.find({ guildID: ayarlar.guildID, inviter: button.member.user.id });
    const daily = invMember ? button.guild.members.cache.filter((usr) => invMember.some((x) => x.userID === usr.user.id) && Date.now() - usr.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
    const weekly = invMember ? button.guild.members.cache.filter((usr) => invMember.some((x) => x.userID === usr.user.id) && Date.now() - usr.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;
      const embed = new MessageEmbed()
      button.reply({ embeds: [embed.setDescription(`
      Toplam **${total + bonus}** davete sahip. (**${regular}** giren, **${leave}** ayrılmış, **${fake}** sahte, **${bonus}** bonus)
      Günlük: **${daily}**, Haftalık: **${weekly}**
      `)], ephemeral: true });
    }
    if (button.customId === "mesaj") {
      const Active1 = await messageUserChannel.find({ guildID: ayarlar.guildID, userID: button.member.user.id }).sort({ channelData: -1 });
      let messageTop;
      Active1.length > 0 ? messageTop = Active1.splice(0, 5).map(x => `<#${x.channelID}>: \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n") : messageTop = "Veri bulunmuyor.";
      const messageData = await messageUser.findOne({ guildID: ayarlar.guildID, userID: button.member.user.id });
      const messageDaily = messageData ? messageData.dailyStat : 0;
      const messageWeekly = messageData ? messageData.weeklyStat : 0;
      const embed = new MessageEmbed()
      button.reply({ embeds: [embed.setDescription(`Kullanıcının ${moment(Date.now()).format("LLL")} tarihinden  itibaren ${button.guild.name} sunucusunda toplam mesaj bilgileri aşağıda belirtilmiştir.
      
      ${ayarlar.ramal_chat} • __**Toplam Mesaj**__: ${messageData ? messageData.topStat : 0} Mesaj
      ${ayarlar.ramal_chat} • __**Haftalık Mesaj**__: ${Number(messageWeekly).toLocaleString()} Mesaj 
      ${ayarlar.ramal_chat} • __**Günlük Mesaj**__": ${Number(messageDaily).toLocaleString()} Mesaj

      ${ayarlar.ramal_arama} **__Sohbet Ettiğin Text Kanalları__**: ${messageTop}
      `)], ephemeral: true });
    }
    if (button.customId === "ses") {
      const ramaldata = await sunucuayar.findOne({ guildID: ayarlar.guildID })
      let PublicKategori = ramaldata.PUBLICPARENTS;
		let RegisterKategori = ramaldata.REGISTERPARENTS;
		let SorunCozmeKategori = ramaldata.SOLVINGPARENTS;
		let PrivateKategori = ramaldata.PRIVATEPARENTS;
		let AloneKategori = ramaldata.ALONEPARENTS;
		let EglenceKategori = ramaldata.FUNPARENTS;

    const category = async (parentsArray) => {
			const data = await voiceUserParent.find({ guildID: ayarlar.guildID, userID: button.member.user.id });
			const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
			let voiceStat = 0;
			for (var i = 0; i <= voiceUserParentData.length; i++) {
				voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
			}
			return moment.duration(voiceStat).format("H [saat], m [dakika] s [saniye]");
		};
    const voiceData = await voiceUser.findOne({ guildID: ayarlar.guildID, userID: button.member.user.id });
    const Active2 = await voiceUserChannel.find({ guildID: ayarlar.guildID, userID: button.member.user.id }).sort({ channelData: -1 });
		const voiceLength = Active2 ? Active2.length : 0;
		let voiceTop;
    Active2.length > 0 ? voiceTop = Active2.splice(0, 5).map(x => `<#${x.channelID}>: \`${moment.duration(x.channelData).format("H [saat], m [dakika] s [saniye]")}\``).join("\n") : voiceTop = "Veri bulunmuyor.";
    const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [saat], m [dakika] s [saniye]");
		const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika] s [saniye]");
    const filteredParents = button.guild.channels.cache.filter((x) =>
    x.type === "category" &&
    !PublicKategori.includes(x.id) &&
    !RegisterKategori.includes(x.id) &&
    !SorunCozmeKategori.includes(x.id) &&
    !PrivateKategori.includes(x.id) &&
    !AloneKategori.includes(x.id) &&
    !EglenceKategori.includes(x.id)
  );
      const embed = new MessageEmbed()
      button.reply({ embeds: [embed.setDescription(`Kullanıcının ${moment(Date.now()).format("LLL")} tarihinden  itibaren ${button.guild.name} sunucusunda toplam ses bilgileri aşağıda belirtilmiştir.
      
      ${ayarlar.ramal_voice} • __**Toplam Ses**__: ${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika], s [saniye]")} Süre
      ${ayarlar.ramal_voice} • __**Haftalık Ses**__: ${voiceWeekly} Süre
      ${ayarlar.ramal_voice} • __**Günlük Ses**__: ${voiceDaily} Süre

      ${ayarlar.ramal_arama} **__Vakit Geçirdiğin Ses Kanalları__**: (Toplam ${voiceLength} kanal) 
      ${voiceTop} 
      `)], ephemeral: true });
    }
    if (button.customId === "topstat") {
      let data = await Inviter.find({ guildID: ayarlar.guildID }).sort({ total: -1 });
      let list = data.filter((x) => button.guild.members.cache.has(x.userID)).splice(0, 5).map((x, index) => `\`${index + 1}.\` <@${x.userID}>: \`${x.total + x.bonus} Davet\``).join("\n");
      const messageChannelData = await messageGuildChannel.find({ guildID: ayarlar.guildID }).sort({ channelData: -1 });
      const voiceChannelData = await voiceGuildChannel.find({ guildID: ayarlar.guildID }).sort({ channelData: -1 });
      const messageUsersData = await messageUser.find({ guildID: ayarlar.guildID }).sort({ topStat: -1 });
      const voiceUsersData = await voiceUser.find({ guildID: ayarlar.guildID }).sort({ topStat: -1 });
      const messageGuildData = await messageGuild.findOne({ guildID: ayarlar.guildID });
      const voiceGuildData = await voiceGuild.findOne({ guildID: ayarlar.guildID });

      const messageChannels = messageChannelData.splice(0, 5).map((x, index) => `\`${index+1}.\` <#${x.channelID}>: \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n");
      const voiceChannels = voiceChannelData.splice(0, 5).map((x, index) => `\`${index+1}.\` <#${x.channelID}>: \`${moment.duration(x.channelData).format("H [saat], m [dakika] s [saniye]")}\``).join("\n");
      const messageUsers = messageUsersData.splice(0, 5).map((x, index) => `\`${index+1}.\` <@${x.userID}>: \`${Number(x.topStat).toLocaleString()} mesaj\``).join("\n");
      const voiceUsers = voiceUsersData.splice(0, 5).map((x, index) => `\`${index+1}.\` <@${x.userID}>: \`${moment.duration(x.topStat).format("H [saat], m [dakika] s [saniye]")}\``).join("\n");

      const embed = new MessageEmbed()
      button.reply({ embeds: [embed.setAuthor(button.guild.name, button.guild.iconURL({ dynamic: true, size: 2048 })).setThumbnail(button.guild.iconURL({ dynamic: true, size: 2048 })).setDescription(`${button.guild.name} sunucusunun toplam ses, chat, davet bilgileri gösterilmektedir.`).addField(`**Genel ses sıralaması(\`Toplam ${moment.duration(voiceGuildData ? voiceGuildData.topStat : 0).format("H [saat], m [dakika] s [saniye]")}\`)**`,`${voiceUsers.length > 0 ? voiceUsers : "Veri Bulunmuyor."}`,true).addField(`**Genel chat sıralaması(\`Toplam ${Number(messageGuildData ? messageGuildData.topStat : 0).toLocaleString()} mesaj\`)**`,`${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`,true).addField("Davetler", `${list}`, true)], ephemeral: true });
    }
    if (button.customId === "istatistikler") {

      let data = await sunucuayar.findOne({
        guildID: ayarlar.guildID
    });

    let top = button.guild.memberCount;
    let tagges = button.guild.members.cache.filter(s => data.TAG.some(a => s.user.tag.toLowerCase().includes(a))).size
    let bot = button.guild.channels.cache.filter(channel => channel.type == "GUILD_VOICE").map(channel => channel.members.filter(member => member.user.bot).size).reduce((a, b) => a + b);
    let ses = button.guild.members.cache.filter(s => s.voice.channel).size
    let boost = button.guild.premiumSubscriptionCount;
    let boostlevel = button.guild.premiumTier;
    let online = button.guild.members.cache.filter(m => (m.presence && m.presence.status !== "offline")).size

      const embed = new MessageEmbed()
      button.reply({ embeds: [embed.setDescription(`${button.guild.name} Sunucunsunun istatistik verileri:

     \`>\` Sunucumuz da üye sayısı: **${top}** (\`${online}.Online\`)
     \`>\` Sunucumuzu boostlayan üye sayısı: **${boost}** (\`${boostlevel}.Lvl\`) 
     \`>\` Sesli kanallardaki üye sayısı: **${ses}** (\`Bot: ${bot}\`) 
     \`>\` Sunucunun oluşturulma tarihi: **${moment(button.guild.createdAt).locale("tr").format("LLL")}** 
     \`>\` Sunucu destek numarası: **${(button.guild.id)}**`)], ephemeral: true });
    }
    if (button.customId === "kayitsiz") {
      
      let data = await sunucuayar.findOne({
        guildID: ayarlar.guildID
    });
    let unRegisterRol = data.UNREGISTER;
    let Booster = data.BOOSTER;
    let defaultName = data.DEFAULTNAME;
    const embed = new MessageEmbed() 
    if(button.member.roles.cache.has(Booster)) return button.reply({ embeds: [embed.setDescription(`${button.member.toString()} Booster bi üye olduğun için kendini kayıtsıza atamazsın`)], ephemeral: true });
    if(unRegisterRol.some(s => button.member.roles.cache.has(s))) return button.reply({ embeds: [embed.setDescription(`${button.member.toString()} Zaten kayıtsız bir üyesiniz`)], ephemeral: true });
    if (!button.member.manageable) return button.reply({ embeds: [embed.setDescription(`${button.member.toString()} Kayıtsıza atma işlemi başarısız`)], ephemeral: true });
    await button.member.roles.set(unRegisterRol).catch();
    await button.member.setNickname(defaultName).catch();
    await button.reply({ embeds: [embed.setDescription(`${button.member.toString()} Kayıtsıza atıldınız`)], ephemeral: true });

    }


  });






    
