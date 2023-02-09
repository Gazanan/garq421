const { MessageEmbed } = require('discord.js');
const client = global.client;
const moment = require('moment');
require('moment-duration-format');
const message = require('../Events/message');
let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setFooter({text: 'Created by ramal.'})
const modsData = require('../Models/Mods.js')
const registerData = require('../Models/Register')
const statData = require('../Models/Stats')
const sunucuayar = require("../Models/sunucuayar"); 
const ayarlar = require('../../Ayarlar.json')

Promise.prototype.sil = function(time) {
    if (this) this.then(s => {
        if (s.deletable) {
setTimeout(async() => {
    s.delete().catch(e => {});
}, time * 1000)
        } 
    });
};


class Cevap {
static yetki(msg) {
    let embd = embed.setDescription(`${msg.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)
msg.channel.send({embeds: [embd]}).sil(7);
}
static async tagacik(msg, bt, row) { 
await bt.reply({embeds: [embed.setDescription(`Taglı alım modu zaten aktif!`)], ephemeral: true})


} 
static async tagacildi(msg, bt, row) {
  await  bt.reply({embeds: [embed.setDescription(`Taglı alım modu başarıyla aktif edildi!`)], ephemeral: true})
  
}
static async tagkapali(msg, bt, row) { 
    await bt.reply({embeds: [embed.setDescription(`Taglı alım modu zaten deaktif!`)], ephemeral: true})
    
    }
    static async tagkapandi(msg, bt, row) { 
        await bt.reply({embeds: [embed.setDescription(`Taglı alım modu başarıyla deaktif edildi!`)], ephemeral: true})
        
    }
    static async tagsec(msg, b) { 
        let data = await modsData.findOne({guildID: msg.guild.id})
        await msg.channel.send({embeds: [embed.setDescription(`Tag modu işlemleri için aşağıdaki butonları kullanabilirsiniz. Şuanda **( ${data.tagMode == true ? 'Açık!' : 'Kapalı!'} )**`)], components: [b]})
    }
    static async isimsec(msg, b) {
        
        let data = await modsData.findOne({guildID: msg.guild.id})
        await msg.channel.send({embeds: [embed.setImage('https://cdn.discordapp.com/attachments/818488172753322014/859857168165503006/image0.png').setDescription(`İsim modu işlemleri için aşağıdaki butonları kullanabilirsiniz Şuanda **( ${data.nameMode == true ? 'Açık!' : 'Kapalı!'} )**.`)], components: [b]})
    }
    static async isimacik(msg, bt) {
        bt.reply({embeds: [embed.setImage(null).setDescription(`İsim modu zaten aktif!`)], ephemeral: true})
        }
        static async isimacildi(msg, bt) {
          await  bt.reply({embeds: [embed.setImage(null).setDescription(`İsim modu başarıyla aktif edildi!`)], ephemeral: true})
        }
        static async isimkapali(msg, bt) {
           await bt.reply({embeds: [embed.setImage(null).setDescription(`İsim modu zaten deaktif!`)], ephemeral: true})
            }
            static async isimkapandi(msg, bt) {
               await bt.reply({embeds: [embed.setImage(null).setDescription(`İsim modu başarıyla deaktif edildi!`)], ephemeral: true})
            }
}

class Register {

    static async Man(user, admin,name,channel) {
const ramalData = await sunucuayar.findOne({ guildID: ayarlar.guildID })
await user.roles.add(ramalData.MAN).catch()
await user.roles.remove(ramalData.UNREGISTER).catch()
await user.setNickname(name).catch()
let data = await registerData.find({ guildID: channel.guild.id, userID: user.id })
let x = data.length > 5 ? data.length - (data.length - 5) : data.length
let modData = await modsData.findOne({guildID: channel.guild.id})
        let userData = await registerData.findOne({ guildID: channel.guild.id, userID: user.id })
        let adminData = await statData.findOne({ guildID: channel.guild.id, userID: admin.id })     
        let isimler = data.length > 0 ? data.map((value, i) => `\`${value.Name}\` (${user.guild.roles.cache.get(value.Sex)})`).slice(data.length > 5 ? data.length - 5 : 0, data.length).join('\n') : "Bu kullanıcı daha önce kayıt olmamış!"
        await new registerData({ guildID: channel.guild.id, userID: user.id, Name: name, Sex: ramalData.MAN[0], Date: Date.now() }).save();
        if (!adminData) { new statData({ guildID: channel.guild.id, userID: admin.id, Man: 1, Woman: 0, Total: 1 }).save() } else { adminData.Man++, adminData.Total++, adminData.save(); }
        if (modData && modData.nameMode === true) { channel.send({embeds: [embed.setDescription(`${user} üyesinin ismi başarıyla \`${name}\` olarak değiştirildi. Bu üye daha önce bu isimlerle kayıt olmuş. \n\n ${user.guild.emojis.cache.get(ayarlar.yes)} Kişinini toplamda **${x}** isim kayıtı bulundu. \n ${isimler} \n\n Kişinin önceki isimlerine \`.isimler @ramal/ID\` komutuyla bakarak kayıt işlemini gerçekleştirmeniz önerilir.`)]}).sil(10); } else { channel.send({embeds: [embed.setDescription(`${user}, ${admin} tarafından başarıyla __**[ERKEK]**__ olarak kayıt edilmiştir.`)]}) }
        if (ramalData.TAG.some(s => user.user.username.includes(s) || user.user.discriminator.includes(s) || user.user.tag.includes(s))) await user.roles.add(ramalData.CREW).catch()

    }
    static async Woman(user, admin,name,channel) {
        const ramalData = await sunucuayar.findOne({ guildID: ayarlar.guildID })
        await user.roles.add(ramalData.WOMAN).catch()
        await user.roles.remove(ramalData.UNREGISTER).catch()
        await user.setNickname(name).catch()
        let data = await registerData.find({ guildID: channel.guild.id, userID: user.id })
        let x = data.length > 5 ? data.length - (data.length - 5): data.length
        let modData = await modsData.findOne({guildID: channel.guild.id})
                let userData = await registerData.findOne({ guildID: channel.guild.id, userID: user.id })
                let adminData = await statData.findOne({ guildID: channel.guild.id, userID: admin.id })     
                let isimler = data.length > 0 ? data.map((value, i) => `\`${value.Name}\` (${user.guild.roles.cache.get(value.Sex)})`).slice(data.length > 5 ? data.length - 5 : 0, data.length).join('\n') : "Bu kullanıcı daha önce kayıt olmamış!"
                await new registerData({ guildID: channel.guild.id, userID: user.id, Name: name, Sex: ramalData.WOMAN[0], Date: Date.now() }).save();
                if (!adminData) { new statData({ guildID: channel.guild.id, userID: admin.id, Man: 0, Woman: 1, Total: 1 }).save() } else { adminData.Woman++, adminData.Total++, adminData.save(); }
                if (modData && modData.nameMode === true) { channel.send({embeds: [embed.setDescription(`${user} üyesinin ismi başarıyla \`${name}\` olarak değiştirildi. Bu üye daha önce bu isimlerle kayıt olmuş. \n\n ${user.guild.emojis.cache.get(ayarlar.yes)} Kişinini toplamda **${x}** isim kayıtı bulundu. \n ${isimler} \n\n Kişinin önceki isimlerine \`.isimler @ramal/ID\` komutuyla bakarak kayıt işlemini gerçekleştirmeniz önerilir.`)]}).sil(10); } else { channel.send({embeds: [embed.setDescription(`${user}, ${admin} tarafından başarıyla __**[KADIN]**__ olarak kayıt edilmiştir.`)]}) }
                if (ramalData.TAG.some(s => user.user.username.includes(s) || user.user.discriminator.includes(s) || user.user.tag.includes(s))) await user.roles.add(ramalData.CREW).catch()
           
            }
    static async checkUser(member, message) {
     const ramalData = await sunucuayar.findOne({ guildID: ayarlar.guildID })    
    if(member.user.bot) return message.reply({embeds: [embed.setDescription(`${message.member}, Kayıt ettiğin kullanıcı bir bot olamaz!`)]}).sil(7)
    if(member.user.id == message.member.id) return message.reply({embeds: [embed.setDescription(`${message.member}, Kendini kayıt edemezsin!`)]}).sil(7);
    if(member.user.id == message.guild.ownerId) return message.reply({embeds: [embed.setDescription(`${message.member}, Sunucu sahibini kayıt edemezsin!`)]}).sil(7);
    if(member.roles.highest.position >= message.member.roles.highest.position) return message.reply({embeds: [embed.setDescription(`${message.member}, Bu kullanıcı sizden üst/aynı pozisyonda.`)]}).sil(7);
   if(ramalData.MAN.some(s => member.roles.cache.has(s)) || ramalData.WOMAN.some(x => member.roles.cache.has(x))) return message.reply({embeds: [embed.setDescription(`${message.member}, Bu kullanıcı zaten kayıtlı.`)]}).sil(7);
   if(!ramalData.UNREGISTER.some(s => member.roles.cache.has(s))) return message.reply({embeds: [embed.setDescription(`${message.member}, Kullanıcıda kayıtsız rolü bulunmadığı için işlem gerçekleştirilemedi.`)]}).sil(7);
 
   let data = await modsData.findOne({guildID: message.guild.id});
   if(!data && !data.length) return new modsData.findOne({guildID: message.guild.id, tagMode: false, nameMode: false}).save();
   if(data.tagMode == true) {
       if(ramalData.TAG.some(x => member.user.username.includes(x) || member.user.discriminator.includes(x)  || member.roles.cache.has(ramalData.VIP) || member.roles.cache.has(ramalData.BOOSTER))) {return false } else {
         return  message.reply({embeds: [embed.setDescription(`${message.member}, Kullanıcıda tag bulunmadığı için kayıt işlemi gerçekleştirilemedi.`)]}).sil(7)}
   }

    return false;
    }
 
    static fixname(member, isim, yaş) {
         let fixTag = `${ayarlar.taglar.some(s => member.user.username.includes(s) || member.user.discriminator.includes(s) || member.user.tag.includes(s)) ? ayarlar.tag : ayarlar.isimtag}`
        var name;
        if (yaş) name = `${fixTag} ${isim} | ${yaş}`
        if (!yaş) name = `${fixTag} ${isim}`
        if(!isim && !yaş) name = `${fixTag} ${member.user.username.replaceAll(ayarlar.taglar[0],"").replaceAll(ayarlar.taglar[1], '').replaceAll(ayarlar.taglar[2], '').replaceAll(ayarlar.taglar[3], '').replaceAll(ayarlar.taglar[4], '').replaceAll(ayarlar.taglar[5], '').replaceAll(ayarlar.taglar[6], '')}`
        return name;
    }
    static async checkPerms(user) {
const ramalData = await sunucuayar.findOne({ guildID: ayarlar.guildID })           
if(!ramalData.REGISTERYetkiliRol.some(s => user.roles.cache.has(s)) && !user.permissions.has('ADMINISTRATOR') && !message.member.roles.cache.has(ramalData.BOTOWNER)) return true;
return false;
    }

static async tagac(msg, bt, row) {
    let modData = await modsData.findOne({guildID: msg.guild.id})
    
    if(!modData)  { 
        new modsData({guildID: msg.guild.id, tagMode: true, nameMode:false}).save();
       return await Cevap.tagacildi(msg, bt, row);
    }
   if(modData && modData.tagMode == true) { return await Cevap.tagacik(msg, bt, row)} else {modData.tagMode = true; modData.save();  return await Cevap.tagacildi(msg, bt, row)}
    
}
static async tagkapat(msg, bt, row) {
    let data = await modsData.findOne({guildID: msg.guild.id})
    
    if(!data)  { 
        new modsData({guildID: msg.guild.id, tagMode: false, nameMode:false}).save();
       return await Cevap.tagkapandi(msg, bt, row); 
    }
    if(data && data.tagMode == false) { 
        return await Cevap.tagkapali(msg, bt, row);
    } else {
        data.tagMode = false; 
        data.save();  
        await Cevap.tagkapandi(msg, bt, row)
    }
    
}

static async isimkapat(msg, bt) {
    let data = await modsData.findOne({guildID: msg.guild.id})

    if(!data)  { 
        new modsData({guildID: msg.guild.id, tagMode: false, nameMode:false}).save();
       return await Cevap.isimkapandi(msg, bt);
    }
    if(data && data.nameMode == false) { return await Cevap.isimkapali(msg, bt)} else {data.nameMode = false; data.save();  return await Cevap.isimkapandi(msg, bt)}
    
}

static async isimac(msg, bt) {
    let data = await modsData.findOne({guildID: msg.guild.id})

    if(!data)  { 
        new modsData({guildID: msg.guild.id, tagMode: false, nameMode:true}).save();
       return await Cevap.isimacildi(msg);
    }
    if(data && data.nameMode == true) { return await Cevap.isimacik(msg, bt)} else {data.nameMode = true; data.save();  return await Cevap.isimacildi(msg, bt)}
    
}

}
module.exports = { Cevap, Register };




















