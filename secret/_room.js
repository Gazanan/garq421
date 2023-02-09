const { Client, Intents, Constants, MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu } = require("discord.js");
const { stripIndents } = require("common-tags");
const Schema = require("./_model.js");
const Modals = require("discord-modals");
const mongoose = require("mongoose");

class Bot extends Client {
    constructor(options = {}) {
        super({
            presence: { activities: [{ name: "Created by ramal.", type: "WATCHING" }] },
            partials: [
                ...Object.keys(Constants.PartialTypes)
            ],
            intents: [
                ...Object.keys(Intents.FLAGS)
            ],
            ...options
        });

        this.config = {
            TOKEN: "",
            MONGO: "",
            CATEGORY: "1001601831069286401",
            LOG: "1001609068089180313"
        }
    }

    getRandomInt (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async init () {
        mongoose.connect(this.config.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            this.login(this.config.TOKEN).then(async () => {
                console.log("Discord Bağlantısı Kuruldu ✔")
            })
            console.log("Mongo Bağlantısı Kuruldu ✔")
        });
    }
}

const App = new Bot();
App?.init()
Modals(App);

/**
 * @param {Client} App 
*/

App?.on("ready", async () => {
    const Guild = App?.guilds.cache.first();

    setInterval(async () => {
        const NonRooms = (await Schema.find({}) || [])?.filter((r) => !Guild.channels.cache.get(r.Id) || (Date.now() - (r.LastJoin ?? 0)) > (1000*60*30) && (Guild.channels.cache.get(r.Id)?.members?.size ?? 0) == 0);

        for (let VT of NonRooms) {
            await Schema.deleteMany({Id: VT.Id});
            if (Guild.channels.cache.get(VT.Id) && Guild.channels.cache.get(VT.Id)?.deletable) Guild.channels.cache.get(VT.Id)?.delete("Oda ile 30 dakika içerisinde herhangi bir etkileşimde bulunulmadı.");
        }
    }, 1000*30)
})

const Stats = mongoose.model("RoomDuration", new mongoose.Schema({
    User: String,
    Room: String,
    Duration: Number
}))

const Log = (content) => {
    const Guild = App?.guilds.cache.first();
    const Embed = new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor({name: Guild?.name, iconURL: Guild?.iconURL({dynamic: true})})
    .setDescription(content)
    Guild?.channels.cache.get(App?.config.LOG)?.send({embeds: [Embed]});
}

App?.on("messageCreate", async (message) => {
    if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(".")) return;
    
    let args = message.content.split(' ').slice(1);
    let command = message.content.split(' ')[0].slice(1);
    let embed = new MessageEmbed().setColor("RANDOM").setAuthor({name: message.member.displayName, iconURL: message.member.displayAvatarURL({dynamic: true})})

    switch (command) {
        case "roomcreate":
        case "roomcreate":
            const Room = await Schema.findOne({Owner: message.author.id})
            const Guild = App?.guilds.cache.first();

            const buttons = new MessageActionRow().addComponents([
                new MessageButton().setStyle(Room ? 'DANGER' : 'SECONDARY').setLabel(Room ? "🗑️ Odayı Sil" : "🔧 Oda Oluştur").setCustomId(Room ? "delete" : "create"),
                new MessageButton().setStyle('SECONDARY').setLabel("📝 Oda Ayarlarını Düzenle").setCustomId("edit").setDisabled(Room ? false : true),
                new MessageButton().setStyle('SECONDARY').setLabel("📁 Oda Verilerini Görüntüle").setCustomId("view").setDisabled(Room ? false : true)
            ]);
            
            
     
            message.reply({embeds: [embed.setDescription(stripIndents`
           <@${message.author.id}> **${message.guild.name}** sunusu özel oda sistemine hoş geldiniz.

            Özel oda oluşturmak için ilk olarak \`🔧 Oda Oluştur\` butonuna basınız ve daha sonra çıkan panelden gerekli kısımları doldurunuz ve ordan özel odanızı oluşturunuz.
            Odanızı ayarını değiştirmek isterseniz \`📝 Oda Ayarlarını Düzenle\` butonuna basınız.
            Odanızın verilerini görmek isterseniz isterseniz \`📁 Oda Verilerini Görüntüle\` butonuna basınız.
            En son olarak odanızı silmek isterseniz \`🗑️ Odayı Sil\` butonuna basınız ve özel odanız silinicektir, iyi eğlenceler!
            `)], components: [buttons]}).then(async (msg) => {
                const collector = msg.createMessageComponentCollector({
                    componentType: 'BUTTON',
                    filter: (component) => component.user.id === message.author.id,
                    time: 600000
                });

                collector.on("collect", async (c) => {
                    if (c.customId == "create") {
                        const createRoom = new Modals.Modal()
                        .setCustomId('createroom')
                        .setTitle('Oda oluştur')
                        .addComponents(
                            new Modals.TextInputComponent()
                            .setCustomId('name')
                            .setLabel('Oda ismi yazınız!')
                            .setStyle('SHORT')
                            .setMinLength(4)
                            .setMaxLength(20)
                            .setPlaceholder("Örn Kullanım: ramal Room")
                            .setRequired(true),
                            new Modals.TextInputComponent()
                            .setCustomId('limit')
                            .setLabel('Oda limiti yazınız!')
                            .setStyle('SHORT')
                            .setMinLength(1)
                            .setMaxLength(10)
                            .setPlaceholder("Örn Kulanım: 0 - 99")
                            .setRequired(true)
                        );

                        Modals.showModal(createRoom, {
                            client: App,
                            interaction: c
                        })

                        collector.stop()
                    } else if (c.customId == "delete") {
                        await Schema.deleteMany({Owner: message.author.id});
                        c.reply({embeds: [embed.setDescription(stripIndents`
                         <@${message.author.id}> \`${Room?.Name ?? "Bilinmeyen Oda"}\` odanız başarıyla silinmiştir.
                        `)]})
                        if (Guild.channels.cache.get(Room?.Id) && Guild.channels.cache.get(Room?.Id)?.deletable) Guild.channels.cache.get(Room?.Id)?.delete("Oda, oda sahibi tarafından silindi.");
                        Log(`🗑️ <@${message.author.id}> (\`${message.author.id}\`) tarafından **${Room?.Name ?? "Bilinmeyen Oda"}** isimli oda silindi.`)

                        collector.stop()
                    } else if (c.customId == "edit") {
                        const myRoom = await Schema.findOne({Owner: message.author.id});

                        const editRoom = new Modals.Modal()
                        .setCustomId('edit')
                        .setTitle(`${myRoom?.Name} odasını düzenleyin`)
                        .addComponents(
                            new Modals.TextInputComponent()
                            .setCustomId('name')
                            .setLabel('Oda ismi giriniz!')
                            .setStyle('SHORT')
                            .setMinLength(4)
                            .setMaxLength(20)
                            .setDefaultValue(myRoom?.Name)
                            .setRequired(false),
                            new Modals.TextInputComponent()
                            .setCustomId('limit')
                            .setLabel('Oda limiti giriniz!')
                            .setStyle('SHORT')
                            .setMinLength(1)
                            .setMaxLength(10)
                            .setPlaceholder(`Limit: ${myRoom?.MaxUser ?? 0}`)
                            .setRequired(false)
                        );

                        Modals.showModal(editRoom, {
                            client: App,
                            interaction: c
                        })

                        collector.stop()
                    } else if (c.customId == "view") {
                        const Room = await Schema.findOne({Owner: message.author.id});
                        const moment = require("moment");
                        require("moment-duration-format");
                        moment.locale("tr");

                        c.reply({content: stripIndents`
                        __**[BILGI]**__ \`#${Room?.Name ?? "Bilinmeyen Oda"}\` Özel odasının ayarları;
                        \`\`\`
                        Oda Sahibi: ${message.author.tag}
                        Oda İsmi: ${Room?.Name ?? "Bilinmeyen Oda"}
                        Oda Limiti: ${(Room?.Limit ?? "Sınırsız").replace(0, "0")}
                        Odaya Son Giriş Tarihi: ${moment((Room?.LastJoin ?? Date.now())).fromNow()}
                        Odada Gçirilen Süre: ${moment.duration(Room?.Duration ?? 0).format("h [saat], m [dakika], s [saniye]")} 
                        \n\`\`\`
                        `})
                    


                    }
                });

                collector.on("end", (i) => {
                    buttons.components[0].setDisabled(true);
                    buttons.components[1].setDisabled(true);
                    buttons.components[2].setDisabled(true);
                    if (msg) msg.edit({components: [buttons]});
                });
            })
            break;
    
        default:
            break;
    }
})

App?.on("modalSubmit", async (modal) => {
    const Guild = App?.guilds.cache.first();

    if (modal.customId == "createroom") {
        const roomName = modal.getTextInputValue("name");
        const roomPass = modal.getTextInputValue("password");
        const roomLimit = modal.getTextInputValue("limit");

        Guild?.channels.create(roomName, {
            type: "GUILD_VOICE",
            userLimit: roomLimit > 99 ? 99 : roomLimit
        }).then(async (c) => {
            new Schema({
                Id: c.id,
                Owner: modal.user.id,
                Name: roomName,
                Password: roomPass,
                Users: [],
                Duration: 0,
                LastJoin: Date.now(),
                MaxUser: roomLimit > 99 ? 99 : roomLimit
            }).save()

            c.setParent(App?.config.CATEGORY);
            c.permissionOverwrites.edit(Guild?.id, {
                VIEW_CHANNEL: false,
                CONNECT: false
            });

            let embed = new MessageEmbed().setColor("RANDOM").setAuthor({name: modal.member.displayName, iconURL: modal.member.displayAvatarURL({dynamic: true})});
            const invite = await c.createInvite({maxUses: 1});
        
            if (!modal.replied) modal.reply({embeds: [embed.setDescription(stripIndents`
            <@${modal.user.id}> odanız başarıl bir şekilde oluşturuldu.
            [buraya tıklayarak girebilirsiniz](https://discord.gg/${invite.code})
            `)]});

            Log(`🔧 <@${modal.user.id}> (\`${modal.user.id}\`) tarafından **${roomName}** isimli oda oluşturuldu.`)
        })

    } else if (modal.customId == "edit") {
        const room = await Schema.findOne({Owner: modal.user.id});
        const name = modal.getTextInputValue("name");
        const password = modal.getTextInputValue("password");
        const limit = modal.getTextInputValue("limit");

        let embed = new MessageEmbed().setColor("RANDOM").setAuthor({name: modal.member.displayName, iconURL: modal.member.displayAvatarURL({dynamic: true})});
        modal.reply({embeds: [embed.setDescription(stripIndents`
        <@${modal.user.id}> odanız başarılı bir şekilde güncellendi.
        `)]})
        
        if (Guild?.channels?.cache.get(room?.Id) && Guild?.channels?.cache.get(room?.Id)?.editable) {
            if (name !== (room?.Name)){
                await Schema.findOneAndUpdate({Owner: modal.user.id}, {$set:{Name: name}}, {upsert: true});
                await Guild?.channels?.cache.get(room?.Id)?.setName(name, "Oda sahibi, oda ismini değiştirdi.");
            } else if (limit !== (room?.Limit)){
                await Schema.findOneAndUpdate({Owner: modal.user.id}, {$set:{Limit: limit}}, {upsert: true});
                await Guild?.channels?.cache.get(room?.Id)?.setUserLimit(limit, "Oda sahibi, oda limitini değiştirdi.");
            } if (password !== (room?.Password)) await Schema.findOneAndUpdate({Owner: modal.user.id}, {$set:{Password: password}}, {upsert: true});
        }

        Log(`🔧 <@${modal.user.id}> (\`${modal.user.id}\`) tarafından **${name}** isimli oda güncellendi.`) 
    }
})











