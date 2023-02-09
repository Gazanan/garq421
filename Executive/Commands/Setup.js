const Discord = require("discord.js");
const ayarlar = require('../../Ayarlar.json')
const { channel } = require("diagnostics_channel");
let mongoose = require("mongoose");
let sunucuayar = require("../Models/sunucuayar");

module.exports.run = async(client, message, args, embed) => {
    if (!ayarlar.BotOwner.includes(message.author.id)) return message.reply("Bu Komutu Bot Ownerı Olman Gerek.")
        if(args[0]=='help'){
            message.reply({ embeds: [embed.setDescription("```Sunucu  Kurulum Komutları```1 - Sunucu Tagı\n2 - Sunucu Name Tagı\n3 - Default Name\n4 - Şüpheli Name\n5 - Bot Owner Rolü\n6 - Erkek Rolü\n7 - Kadın Rolü\n8 - Kayıtsız Rolü\n9 - Taglı Rolü\n10 - Şüpheli Rolü\n11 - Vip Rolü\n12 - Booster Rolü\n13 - Register Rolü\n14 - Ban Yetkili Rol\n15 - Jail Yetkili Rol\n16 - Cmute Yetkili Rol\n17 - Vmute Yetkili Rol\n18 - Karantina Rol\n19 - Cmuteli Rol\n20 - Vmuteli Rol\n21 - Çekiliş Rol\n22 - Etkinlik Rol\n23 - Lovers Rol\n24 - Alone Rol\n25 - Pembe Renk Rol\n26 - Mor Renk Rol\n27 - Mavi Renk Rol\n28 - Kırmızı Renk Rol\n29 - Beyaz Renk Rol\n30 - Chat Kanalı\n31 - Rules Kanalı\n32 - Kayıt Kanalı\n33 - Erkek Kayıt Log\n34 - Kadın Kayıt Log\n35 - Ban Log\n36 - Jail Log\n37 - Cmute Log\n38 - Vmute Log\n39 - Ceza Puan Log\n40 - Transporter Log\n41 - Invite Log\n42 - Message Log\n43 - Voice Log\n44 - Commands Log\n45 - Tag Log\n46 - Rol Log\n47 - Ship Kanalı\n48 - Özel Oda Log\n49 - Public Kategori\n50 - Register Kategori\n51 - Sorun Çözme Kategori\n52 - Private Kategori\n53 - Alone Kategori\n54 - Eğlence Kategori\n55 - Özel Oda Kategorisi\n```Diğer Komutlar```Bilgi - Setup Bilgi\nSıfırla - Setup Sıfırla")] });
         } 
         if(args[0]=='sıfırla'){
            await sunucuayar.deleteMany()
            message.reply("Başrıyla Kurulum Sıfırlandı")
        } 
        if(args[0]=='bilgi'){
            let data = await sunucuayar.findOne({
                guildID: message.guild.id
            });
        
            let erkekRol = data.MAN;
            let TagLog = data.TAGLOG;
            let kadinRol = data.WOMAN;
            let unRegisterRol = data.UNREGISTER;
            let RegisterRol = data.REGISTERYetkiliRol;
            let kayıtKanalı = data.REGISTER;
            let erkekLog = data.ERKEKLOG;
            let kadınLog = data.KADINLOG;
            let sunucuId = data.guildID;
            let tag = data.TAG;
            let nameTag = data.NAMETAG;
            let botOwner =  data.BOTOWNER;
            let chat = data.CHAT;
            let defaultName = data.DEFAULTNAME;
            let vip = data.VIP;
            let booster = data.BOOSTER;
            let suspeciousName = data.SUSPECİOUSNAME;
            let Suspecious = data.SUSPECİOUS;
            let Rules = data.RULES;
            let TaglıRol = data.CREW;
            let PublicKategori = data.PUBLICPARENTS;
            let RegisterKategori = data.REGISTERPARENTS;
            let SorunCozmeKategori = data.SOLVINGPARENTS;
            let PrivateKategori = data.PRIVATEPARENTS;
            let AloneKategori = data.ALONEPARENTS;
            let EglenceKategori = data.FUNPARENTS;
            let BanLog = data.BANLOG;
            let JailLog = data.JAILLOG;
            let CmuteLog = data.CMUTELOG;
            let VmuteLog = data.VMUTELOG;
            let CezaPuanLog = data.CEZAPUANLOG;
            let BanYetkili = data.BanYetkiliRol;
            let JailYetkili = data.JailYetkiliRol;
            let CmuteYetkili = data.CmuteYetkiliRol;
            let VmuteYetkili = data.VmuteYetkiliRol;
            let KarantinaRol = data.CezalıRol;
            let Cmuteli = data.CmuteliRol;
            let Vmuteli = data.VmuteliRol;
            let InvıteLog = data.INVITEChannel;
            let TransporterLog = data.TRANSPORTERLOG;
            let VoiceLog = data.VOICELOG;
            let MesajLog = data.MESSAGELOG;
            let KomutLog = data.KOMUTLOG;
            let etkinlik = data.ETKINLIK;
            let cekilis = data.CEKILIS;
            let alone = data.ALONE;
            let lovers = data.LOVERS;
            let pembe = data.PEMBE;
            let kirmizi = data.KIRMIZI;
            let mor = data.MOR;
            let mavi = data.MAVI;
            let beyaz = data.BEYAZ;
            let rollog = data.ROLLOG;
            let shipchannel = data.SHIPKANAL;
            let ozelodachannel = data.OZELODALOG;
            let ozelodakategori = data.OZELODAPARENTS;
            
                message.reply({ embeds: [embed.setDescription(`\n\n\`\`\`Sunucu Genel Ayarları\`\`\`Sunucu ID: ${sunucuId}\nSunucu Tagları: ${tag}\nSunucu Name Tagı: ${nameTag}\nDefault Name: ${defaultName}\nŞüpheli Name: ${suspeciousName}\nBot Owner Rol: <@&${botOwner}>\n\`\`\`Ceza Ayarları\`\`\`Ban Yetkilileri: ${BanYetkili.map(x => `<@&${x}>`)}\nJail Yetkilileri: ${JailYetkili.map(x => `<@&${x}>`)}\nCMute Yetkilileri: ${CmuteYetkili.map(x => `<@&${x}>`)}\nVmute Yetkilileri: ${VmuteYetkili.map(x => `<@&${x}>`)}\nCezalı Rol: <@&${KarantinaRol}>\nCmuteli Rol: <@&${Cmuteli}>\nVmuteli Rol: <@&${Vmuteli}>\n\`\`\`Kayıt Ayarları\`\`\`Kayıt Rolleri: ${RegisterRol.map(x => `<@&${x}>`)}\nErkek Rolleri: <@&${erkekRol}>\nKadın Rolleri: <@&${kadinRol}>\nKayıtsız Rolleri: <@&${unRegisterRol}>\nTaglı Rolleri: <@&${TaglıRol}>\nŞüpheli Rolleri: <@&${Suspecious}>\nBooster Rolleri:<@&${booster}>\nVip Rolleri: <@&${vip}>\n\`\`\`Rol Ayarları\`\`\`Çekiliş Katılımcısı: <@&${cekilis}>\nEtkinlik Katılımcsı: <@&${etkinlik}>\nAlon Rolü: <@&${alone}>\nLovers Rolü: <@&${lovers}>\nPembe Renk Rolü: <@&${pembe}>\nMor Renk Rolü: <@&${mor}>\nMavi Renk Rolü: <@&${mavi}>\nBeyaz Renk  Rolü: <@&${beyaz}>\nKırmızı Renk Rolü: <@&${kirmizi}>\n\`\`\`Kanal Ayarları\`\`\`Chat Kanalı: <#${chat}>\nRules Kanalı: <#${Rules}>\nKayıt Kanalı: <#${kayıtKanalı}>\nErkek Kayıt Log: <#${erkekLog}>\nKadın Kayıt Log: <#${kadınLog}>\nBan Log: <#${BanLog}>\nJail Log: <#${JailLog}>\nCmute Log: <#${CmuteLog}>\nVmute Log: <#${VmuteLog}>\nCeza Puan Log: <#${CezaPuanLog}>\nTransporter Log: <#${TransporterLog}>\nInvite Log: <#${InvıteLog}>\nVoice Log: <#${VoiceLog}>\nMessage Log: <#${MesajLog}>\nCommands Log: <#${KomutLog}>\nTag Log: <#${TagLog}>\nRol Log: <#${rollog}>\nShip Kanal: <#${shipchannel}>\nÖzel Oda Log: <#${ozelodachannel}>\n\`\`\`Kategori Ayarları\`\`\`Public Kategorisi: <#${PublicKategori}>\nRegister Kategorisi: <#${RegisterKategori}>\nSorun Çözme Kategorisi: <#${SorunCozmeKategori}>\nPrivate Kategorisi: <#${PrivateKategori}>\nAlone Kategorisi: <#${AloneKategori}>\nEğlence Kategorisi: <#${EglenceKategori}>\nÖzel Oda Kategorisi: <#${ozelodakategori}>`)]}).catch(e => { });
                
           
        } 
        if(args[0]=='1'){
            if(!args[1]) return message.reply("Sunucu Tagı Belirt")
            let tag = args[1]
            await sunucuayar.updateOne({guildID: message.guild.id},{$push: {TAG: tag}}, {upsert: true});
             message.reply("Başarıyla Sunucu Tagı Ayarlandı")
         } 
        if(args[0]== '2'){
            if(!args[1]) return message.reply("Name Tagı Belirt")
            let nametag = args[1]
            await sunucuayar.updateOne({ guildID: message.guild.id }, { $set: { NAMETAG: nametag } }, { upsert: true })
            message.reply("Başarıyla Sunucu Name Tagı Ayarlandı")
        }
        if(args[0]== '3'){
            if(!args[1]) return message.reply("Default Name Belirt")
            let defaultname = args[1]
            await sunucuayar.updateOne({ guildID: message.guild.id }, { $set: { DEFAULTNAME: defaultname } }, { upsert: true })
            message.reply("Başarıyla Default Name Ayarlandı")
        }
        if(args[0]== '4'){
            if(!args[1]) return message.reply("Şüpheli Name Belirt")
            let defaultname = args[1]
            await sunucuayar.updateOne({ guildID: message.guild.id }, { $set: { SUSPECİOUSNAME: defaultname } }, { upsert: true })
            message.reply("Başarıyla Şüpheli Name Ayarlandı")
        }
        if(args[0]== '5'){
            if(!args[1]) return message.reply("Bot Owner Rolünü Belirt")
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
            await sunucuayar.updateOne({guildID: message.guild.id},{$set: {BOTOWNER: rol.id}}, {upsert: true});
            message.reply("Başarıyla Bot Owner Rolü Ayarlandı")
        }
        if(args[0]== '6'){
            if(!args[1]) return message.reply("Erkek Rolünü Belirt")
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
            await sunucuayar.updateOne({guildID: message.guild.id},{$set: {MAN: rol.id}}, {upsert: true});
            message.reply("Başarıyla Erkek Rol Ayarlandı")
        }
        if(args[0]=='7'){
            if(!args[1]) return message.reply("Kadın Rolünü Belirt")
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
            await sunucuayar.updateOne({guildID: message.guild.id},{$set: {WOMAN: rol.id}}, {upsert: true});
            message.reply("Başarıyla Kadın Rol Ayarlandı")
        }
        if(args[0]=='8'){
            if(!args[1]) return message.reply("Kayıtsız Rolünü Belirt")
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
            await sunucuayar.updateOne({guildID: message.guild.id},{$set: {UNREGISTER: rol.id}}, {upsert: true});
            message.reply("Başarıyla Kayıtsız Rol Ayarlandı")
        }
        if(args[0]=='9'){
            if(!args[1]) return message.reply("Taglı Rolünü Belirt")
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
            await sunucuayar.updateOne({guildID: message.guild.id},{$set: {CREW: rol.id}}, {upsert: true});
            message.reply("Başarıyla Taglı Rol Ayarlandı")
        }
        if(args[0]=='10'){
            if(!args[1]) return message.reply("Şüpheli Rolünü Belirt")
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
            await sunucuayar.updateOne({guildID: message.guild.id},{$set: {SUSPECİOUS: rol.id}}, {upsert: true});
            message.reply("Başarıyla Şüpheli Rol Ayarlandı")
        }
        if(args[0]=='11'){
            if(!args[1]) return message.reply("Vip Rolünü Belirt")
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
            await sunucuayar.updateOne({guildID: message.guild.id},{$set: {VIP: rol.id}}, {upsert: true});
            message.reply("Başarıyla Vip Rol Ayarlandı")
        }
        if(args[0]=='12'){
            if(!args[1]) return message.reply("Booster Rolünü Belirt")
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
            await sunucuayar.updateOne({guildID: message.guild.id},{$set: {BOOSTER: rol.id}}, {upsert: true});
            message.reply("Başarıyla Booster Rol Ayarlandı")
        }
        if(args[0]=='13'){
            if(!args[1]) return message.reply("Register Rolünü Belirt")
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
            await sunucuayar.updateOne({guildID: message.guild.id},{$push: {REGISTERYetkiliRol: rol.id}}, {upsert: true});
            message.reply("Başarıyla Register Rol Ayarlandı")
        }
        if(args[0]=='14'){
            if(!args[1]) return message.reply("Ban Yetkili Rolünü Belirt")
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
            await sunucuayar.updateOne({guildID: message.guild.id},{$push: {BanYetkiliRol: rol.id}}, {upsert: true});
            message.reply("Başarıyla Ban Yetkili Rol Ayarlandı")
        }
        if(args[0]=='15'){
            if(!args[1]) return message.reply("Jail Yetkili Rolünü Belirt")
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
            await sunucuayar.updateOne({guildID: message.guild.id},{$push: {JailYetkiliRol: rol.id}}, {upsert: true});
            message.reply("Başarıyla Jail Yetkili Rol Ayarlandı")
        }
        if(args[0]=='16'){
            if(!args[1]) return message.reply("Cmute Yetkili Rolünü Belirt")
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
            await sunucuayar.updateOne({guildID: message.guild.id},{$push: {CmuteYetkiliRol: rol.id}}, {upsert: true});
            message.reply("Başarıyla Cmute Yetkili Rol Ayarlandı")
        }
        if(args[0]=='17'){
            if(!args[1]) return message.reply("Vmute Yetkili Rolünü Belirt")
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
            await sunucuayar.updateOne({guildID: message.guild.id},{$push: {VmuteYetkiliRol: rol.id}}, {upsert: true});
            message.reply("Başarıyla Vmute Yetkili Rol Ayarlandı")
        }
        if(args[0]=='18'){
            if(!args[1]) return message.reply("Karantina Rolünü Belirt")
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
            await sunucuayar.updateOne({guildID: message.guild.id},{$set: {CezalıRol: rol.id}}, {upsert: true});
            message.reply("Başarıyla Karantina Rol Ayarlandı")
        }
        if(args[0]=='19'){
            if(!args[1]) return message.reply("Cmuteli Rolünü Belirt")
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
            await sunucuayar.updateOne({guildID: message.guild.id},{$set: {CmuteliRol: rol.id}}, {upsert: true});
            message.reply("Başarıyla Cmuteli Rol Ayarlandı")
        }
        if(args[0]=='20'){
            if(!args[1]) return message.reply("Vmuteli Rolünü Belirt")
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
            await sunucuayar.updateOne({guildID: message.guild.id},{$set: {VmuteliRol: rol.id}}, {upsert: true});
            message.reply("Başarıyla Vmuteli Rol Ayarlandı")
        }
        if(args[0]=='21'){
            if(!args[1]) return message.reply("Çekiliş Katılımcısı Rolünü Belirt")
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
            await sunucuayar.updateOne({guildID: message.guild.id},{$set: {CEKILIS: rol.id}}, {upsert: true});
            message.reply("Başarıyla Çekiliş Katılımcısı Rol Ayarlandı")
        }
        if(args[0]=='22'){
            if(!args[1]) return message.reply("Etkinlik Katılımcısı Rolünü Belirt")
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
            await sunucuayar.updateOne({guildID: message.guild.id},{$set: {ETKINLIK: rol.id}}, {upsert: true});
            message.reply("Başarıyla Etkinlik Katılımcısı Rol Ayarlandı")
        }
        if(args[0]=='23'){
            if(!args[1]) return message.reply("Lovers Rolünü Belirt")
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
            await sunucuayar.updateOne({guildID: message.guild.id},{$set: {LOVERS: rol.id}}, {upsert: true});
            message.reply("Başarıyla Lovers Rol Ayarlandı")
        }
        if(args[0]=='24'){
            if(!args[1]) return message.reply("Alone Rolünü Belirt")
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
            await sunucuayar.updateOne({guildID: message.guild.id},{$set: {ALONE: rol.id}}, {upsert: true});
            message.reply("Başarıyla Alone Rol Ayarlandı")
        }
        if(args[0]=='25'){
            if(!args[1]) return message.reply("Pembe Renk Rolünü Belirt")
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
            await sunucuayar.updateOne({guildID: message.guild.id},{$set: {PEMBE: rol.id}}, {upsert: true});
            message.reply("Başarıyla Pembe Renk Rol Ayarlandı")
        }
        if(args[0]=='26'){
            if(!args[1]) return message.reply("Mor Renk Rolünü Belirt")
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
            await sunucuayar.updateOne({guildID: message.guild.id},{$set: {MOR: rol.id}}, {upsert: true});
            message.reply("Başarıyla Mor Renk Rol Ayarlandı")
        }
        if(args[0]=='27'){
            if(!args[1]) return message.reply("Mavi Renk Rolünü Belirt")
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
            await sunucuayar.updateOne({guildID: message.guild.id},{$set: {MAVI: rol.id}}, {upsert: true});
            message.reply("Başarıyla Mavi Renk Rol Ayarlandı")
        }
        if(args[0]=='28'){
            if(!args[1]) return message.reply("Kırmızı Renk Rolünü Belirt")
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
            await sunucuayar.updateOne({guildID: message.guild.id},{$set: {KIRMIZI: rol.id}}, {upsert: true});
            message.reply("Başarıyla Kırmızı Renk Rol Ayarlandı")
        }
        if(args[0]=='29'){
            if(!args[1]) return message.reply("Beyaz Renk Rolünü Belirt")
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
            await sunucuayar.updateOne({guildID: message.guild.id},{$set: {BEYAZ: rol.id}}, {upsert: true});
            message.reply("Başarıyla Beyaz Renk Rol Ayarlandı")
        }
        if(args[0]=='30'){
            if(!args[1]) return message.reply("Chat Kanalını Belirt")
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
            await sunucuayar.updateOne({ guildID: message.guild.id }, { $set: { CHAT: channel.id } }, { upsert: true })
            message.reply("Başarıyla Chat Kanalı Ayarlandı")
        }
        if(args[0]=='31'){
            if(!args[1]) return message.reply("Rules Kanalını Belirt")
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
            await sunucuayar.updateOne({ guildID: message.guild.id }, { $set: { RULES: channel.id } }, { upsert: true })
            message.reply("Başarıyla Rules Kanalı Ayarlandı")
        }
        if(args[0]=='32'){
            if(!args[1]) return message.reply("Kayıt Kanalını Belirt")
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
            await sunucuayar.updateOne({ guildID: message.guild.id }, { $set: { REGISTER: channel.id } }, { upsert: true })
            message.reply("Başarıyla Kayıt Kanalı Ayarlandı")
        }
        if(args[0]=='33'){
            if(!args[1]) return message.reply("Erkek Kayıt Log Kanalını Belirt")
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
            await sunucuayar.updateOne({ guildID: message.guild.id }, { $set: { ERKEKLOG: channel.id } }, { upsert: true })
            message.reply("Başarıyla Erkek Kayıt Log Kanalı Ayarlandı")
        }
        if(args[0]=='34'){
            if(!args[1]) return message.reply("Kadın Kayıt Log Kanalını Belirt")
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
            await sunucuayar.updateOne({ guildID: message.guild.id }, { $set: { KADINLOG: channel.id } }, { upsert: true })
            message.reply("Başarıyla Kadın Kayıt Log Kanalı Ayarlandı")
        }
        if(args[0]=='35'){
            if(!args[1]) return message.reply("Ban Log Kanalını Belirt")
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
            await sunucuayar.updateOne({ guildID: message.guild.id }, { $set: { BANLOG: channel.id } }, { upsert: true })
            message.reply("Başarıyla Ban Log Kanalı Ayarlandı")
        }
        if(args[0]=='36'){
            if(!args[1]) return message.reply("Jail Log Kanalını Belirt")
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
            await sunucuayar.updateOne({ guildID: message.guild.id }, { $set: { JAILLOG: channel.id } }, { upsert: true })
            message.reply("Başarıyla Jail Log Kanalı Ayarlandı")
        }
        if(args[0]=='37'){
            if(!args[1]) return message.reply("Cmute Log Kanalını Belirt")
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
            await sunucuayar.updateOne({ guildID: message.guild.id }, { $set: { CMUTELOG: channel.id } }, { upsert: true })
            message.reply("Başarıyla Cmute Log Kanalı Ayarlandı")
        }
        if(args[0]=='38'){
            if(!args[1]) return message.reply("Vmute Log Kanalını Belirt")
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
            await sunucuayar.updateOne({ guildID: message.guild.id }, { $set: { VMUTELOG: channel.id } }, { upsert: true })
            message.reply("Başarıyla Vmute Log Kanalı Ayarlandı")
        }
        if(args[0]=='39'){
            if(!args[1]) return message.reply("Ceza Puanı Log Kanalını Belirt")
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
            await sunucuayar.updateOne({ guildID: message.guild.id }, { $set: { CEZAPUANLOG: channel.id } }, { upsert: true })
            message.reply("Başarıyla Ceza Puanı Log Kanalı Ayarlandı")
        }
        if(args[0]=='40'){
            if(!args[1]) return message.reply("Transporter Log Kanalını Belirt")
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
            await sunucuayar.updateOne({ guildID: message.guild.id }, { $set: { TRANSPORTERLOG: channel.id } }, { upsert: true })
            message.reply("Başarıyla Transporterı Log Kanalı Ayarlandı")
        }
        if(args[0]=='41'){
            if(!args[1]) return message.reply("Invite Log Kanalını Belirt")
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
            await sunucuayar.updateOne({ guildID: message.guild.id }, { $set: { INVITEChannel: channel.id } }, { upsert: true })
            message.reply("Başarıyla Invite Log Kanalı Ayarlandı")
        }
        if(args[0]=='42'){
            if(!args[1]) return message.reply("Message Log Kanalını Belirt")
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
            await sunucuayar.updateOne({ guildID: message.guild.id }, { $set: { MESSAGELOG: channel.id } }, { upsert: true })
            message.reply("Başarıyla Message Log Kanalı Ayarlandı")
        }
        if(args[0]=='43'){
            if(!args[1]) return message.reply("Voice Log Kanalını Belirt")
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
            await sunucuayar.updateOne({ guildID: message.guild.id }, { $set: { VOICELOG: channel.id } }, { upsert: true })
            message.reply("Başarıyla Voice Log Kanalı Ayarlandı")
        }
        if(args[0]=='44' || args[0]=='komutlog'){
            if(!args[1]) return message.reply("Commands Log Kanalını Belirt")
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
            await sunucuayar.updateOne({ guildID: message.guild.id }, { $set: { KOMUTLOG: channel.id } }, { upsert: true })
            message.reply("Başarıyla Commands Log Kanalı Ayarlandı")
        }
        if(args[0]=='45'){
            if(!args[1]) return message.reply("Tag Log Kanalını Belirt")
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
            await sunucuayar.updateOne({ guildID: message.guild.id }, { $set: { TAGLOG: channel.id } }, { upsert: true })
            message.reply("Başarıyla Tag Log Kanalı Ayarlandı")
        }
        if(args[0]=='46'){
            if(!args[1]) return message.reply("Rol Log Kanalını Belirt")
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
            await sunucuayar.updateOne({ guildID: message.guild.id }, { $set: { ROLLOG: channel.id } }, { upsert: true })
            message.reply("Başarıyla Rol Log Kanalı Ayarlandı")
        }
        if(args[0]=='47'){
            if(!args[1]) return message.reply("Ship Kanalını Belirt")
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
            await sunucuayar.updateOne({ guildID: message.guild.id }, { $set: { SHIPKANAL: channel.id } }, { upsert: true })
            message.reply("Başarıyla Rol Kanalı Ayarlandı")
        }
        if(args[0]=='48'){
            if(!args[1]) return message.reply("Özel Oda Kanalını Belirt")
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
            await sunucuayar.updateOne({ guildID: message.guild.id }, { $set: { OZELODALOG: channel.id } }, { upsert: true })
            message.reply("Başarıyla Özel Oda  Kanalı Ayarlandı")
        }
        if(args[0]=='49'){
            if(!args[1]) return message.reply("Public Kategoriyi Belirt")
            await sunucuayar.updateOne({ guildID: message.guild.id }, { $set: { PUBLICPARENTS: args[1] } }, { upsert: true })
            message.reply("Başarıyla Public Kategorisi Ayarlandı")
        } 
        if(args[0]=='50'){
            if(!args[1]) return message.reply("Register Kategoriyi Belirt")
            await sunucuayar.updateOne({ guildID: message.guild.id }, { $set: { REGISTERPARENTS: args[1] } }, { upsert: true })
            message.reply("Başarıyla Register Kategorisi Ayarlandı")
        } 
        if(args[0]=='51'){
            if(!args[1]) return message.reply("Sorun Çözme Kategoriyi Belirt")
            await sunucuayar.updateOne({ guildID: message.guild.id }, { $set: { SOLVINGPARENTS: args[1] } }, { upsert: true })
            message.reply("Başarıyla Sorun Çözme Kategorisi Ayarlandı")
        } 
        if(args[0]=='52'){
            if(!args[1]) return message.reply("Private Kategoriyi Belirt")
            await sunucuayar.updateOne({ guildID: message.guild.id }, { $set: { PRIVATEPARENTS: args[1] } }, { upsert: true })
            message.reply("Başarıyla Private Kategorisi Ayarlandı")
        } 
        if(args[0]=='53'){
            if(!args[1]) return message.reply("Alone Kategoriyi Belirt")
            await sunucuayar.updateOne({ guildID: message.guild.id }, { $set: { ALONEPARENTS: args[1] } }, { upsert: true })
            message.reply("Başarıyla Alone Kategorisi Ayarlandı")
        } 
        if(args[0]=='54'){
            if(!args[1]) return message.reply("Eğlence Kategoriyi Belirt")
            await sunucuayar.updateOne({ guildID: message.guild.id }, { $set: { FUNPARENTS: args[1] } }, { upsert: true })
            message.reply("Başarıyla Eğlence Kategorisi Ayarlandı")
        } 
        if(args[0]=='55'){
            if(!args[1]) return message.reply("Özel Oda Kategoriyi Belirt")
            await sunucuayar.updateOne({ guildID: message.guild.id }, { $set: { OZELODAPARENTS: args[1] } }, { upsert: true })
            message.reply("Başarıyla Özel Oda Kategorisi Ayarlandı")
        } 
    
    
};

exports.config = {
    name: "setup",
    usage: `${ayarlar.BotPrefix}setup`,
        guildOnly: true,
    aliases: ["kur","kurulum","Setup"],
    cooldown: 3000
};
