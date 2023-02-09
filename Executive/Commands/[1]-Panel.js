const { MessageButton, MessageActionRow } = require("discord.js");
const ayarlar = require('../../Ayarlar.json')

module.exports.run = async(client, message) => { 
    if (!ayarlar.BotOwner.includes(message.author.id)) return message.reply("Bu Komutu Bot Ownerı Olman Gerek.")
    const row1 = new MessageActionRow().addComponents(
        new MessageButton().setCustomId("katilma").setLabel("1").setStyle("PRIMARY"),
        new MessageButton().setCustomId("isim").setLabel("2").setStyle("PRIMARY"),
        new MessageButton().setCustomId("ceza").setLabel("3").setStyle("PRIMARY"),
    );
    const row2 = new MessageActionRow().addComponents(
        new MessageButton().setCustomId("cezalar").setLabel("4").setStyle("PRIMARY"),
        new MessageButton().setCustomId("roller").setLabel("5").setStyle("PRIMARY"),
        new MessageButton().setCustomId("tarih").setLabel("6").setStyle("PRIMARY"),
    );
    const row3 = new MessageActionRow().addComponents(
        new MessageButton().setCustomId("davetler").setLabel("7").setStyle("PRIMARY"),
        new MessageButton().setCustomId("mesaj").setLabel("8").setStyle("PRIMARY"),
        new MessageButton().setCustomId("ses").setLabel("9").setStyle("PRIMARY"),
    );
    const row4 = new MessageActionRow().addComponents(
        new MessageButton().setCustomId("topstat").setLabel("📊").setStyle("SUCCESS"),
        new MessageButton().setCustomId("istatistikler").setLabel("🔔").setStyle("SECONDARY"),
        new MessageButton().setCustomId("kayitsiz").setLabel("❌").setStyle("DANGER"),
    );

    message.channel.send({ content: `Merhabalar, aşağıdaki yönlendirmeler doğrultusunda ilgili tuşlara basarak istediğiniz şey hakkında bilgi sahibi olabilirsiniz.

**1 :** Sunucuya katılma tarihinizi öğrenin.
**2 :** İsim geçmişinizi gösterir.
**3 :** Devam eden cezalarınızdan 10 tanesini (varsa) görüntüleyin.

**4 :** Ceza durumuzunuzu görüntüleyin.
**5 :** Sahip olduğunuz rolleri gösterir.
**6 :** Hesabınızın oluşturulma tarihini gösterir.

**7 :** Davet bilgilerinizi gösterir.
**8 :** Mesaj istatistiklerinizi gösterir.
**9 :** Ses istatistiklerinizi gösterir.

📊: Sunucu top 5 stat verilerini gösterir.
🔔: Sunucunun istatistiklerini görüntüleyin.
❌: Kaydınızı temizleyin ve tekrar teyit verin.
`, components: [row1, row2, row3, row4]});
};

exports.config = {
    name: "panel",
    usage: `${ayarlar.BotPrefix}panel`,
    guildOnly: true,
    aliases: ["panel"],
    cooldown: 3000
};