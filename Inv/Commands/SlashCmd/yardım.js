const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionCollector, MessageEmbed } = require('discord.js');
const ayarlar = require('../../../Ayarlar.json')
const inviteSchema = require('../../models/invite');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('yardım')
        .setDescription('Bot komutlarını gösteren yardım komutu!'),
    /**
     * 
     * @param {InteractionCollector} interaction 
     */
    async run(interaction) {
        let guildEmbed = new MessageEmbed().setColor('RANDOM').setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) }).setFooter({ text: ayarlar.BotDurum });
        interaction.reply({
            embeds: [guildEmbed.setDescription(`__**Moderasyon Komutları**__\n\`.ban [@ramal/ID] (Sebep)\n.unban [@ramal/ID]\n.forceban [@ramal/ID] (Sebep)\n.banlist\n.jail [@ramal/ID] (Sebep)\n.unjail [@ramal/ID]\n.cmute [@ramal/ID] (Süre) (Sebep)\n.uncmute [@ramal/ID]\n.vmute [@ramal/ID] (Süre) (Sebep)\n.vunmute [@ramal/ID]\n.cezapuan [@ramal/ID]\n.cezasorgu [@ramal/ID]\n.sicil [@ramal/ID]\n.avatar\n.banner\n.rolkontrol\n.rolsüzver\n.urlkullanım\n.tagtarama [Tag]\n.git [@ramal/ID]\n.çek [@ramal/ID]\n.denetim [Rol/Kanal]\n.say\n.sil [Number]\n.n [@ramal/ID]\n.roldenetim [Rol/ID]\n.snipe\n.zengin (Name)\n.kilit\n.kontrol\n.rollog [@ramal/ID]\n.roomcreate\`\n__**Kayıt Komutları**__\n\`.erkek [@ramal/ID] (Name) (Age)\n.kız [@ramal/ID] (Name) (Age)\n.isim [@ramal/ID] (Name) (Age)\n.isimmod\n.isimler\n.setup\n.taglıalım\n.topteyit\n.kayıtsız [@ramal/ID]\n.vip [ramal/ID]\n.info (@ramal/ID)\`\n__**Stat Komutları**__\n\`.me\n.rolstat [@ramal/ID]\n.user [@ramal/ID]\n.top\`\n__**Invite Komutları**__\n\`.topinvites\n.invite [@ramal/ID]\n.bonus [@ramal/ID]\n.sıfırla [@ramal/ID]\``)], ephemeral: true
        });
    }
};