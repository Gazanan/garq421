const { Client, Intents,Collection, interaction, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { on } = require('events');
const fs = require('fs')
const ayarlar = require("../Ayarlar.json")
let sunucuayar = require("../Executive/Models/sunucuayar");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING ] });// intentler detayları djs guide adresinde daha iyi bulursunuz.
client.commands = new Collection();
global.client = client;
/// Bilmiyorsanız dokunmayın (events klasörü yükleme) 
const eventFiles = fs.readdirSync('./MenüSystem/events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

/// Sizleri ilgilendirin kısım
client.on("messageCreate", async (message) => {
	if (message.content === "etkinlik-menü") {
		const menu = new MessageActionRow().addComponents(
			new MessageSelectMenu()
				.setCustomId("etkinlikmenu")
				.setPlaceholder("Etkinlik Rolleri")
				.addOptions([
					{ label: "🎉 Çekiliş katılımcısı rolünü üzerinize almak için tıklayınız.", value: "cekilis" },
					{ label: "🎊 Etkinlik katılımcısı rolünü üzerinize almak için tıklayınız.", value: "etkinlik"},
					{ label: "🗑️ Kaldır", value: "kaldır" },
				])
		);
		message.channel.send({ content: "Aşağıdaki menüye tıklayarak katılımcı rollerini seçebilirsin!", components: [menu] });
	} else if (message.content === "ilişki-menü") {
		const menu = new MessageActionRow().addComponents(
			new MessageSelectMenu()
				.setCustomId("iliskimenu")
				.setPlaceholder("İlişki Rolleri")
				.addOptions([
					{ label: "❤️ Lovers", value: "lovers" },
					{ label: "💔 Alone", value: "alone" },
					{ label: "🗑️ Kaldır", value: "kaldır2" },
				])
		);
		message.channel.send({ content: "İlişki durumunuzu seçmek için aşağıdaki menüyü kullanabilirsiniz!", components: [menu] });
	} else if (message.content === "renk-menü") {
		const menu = new MessageActionRow().addComponents(
			new MessageSelectMenu()
				.setCustomId("renkmenu")
				.setPlaceholder("Renk Rolleri")
				.addOptions([
					{ label: "Pembe", value: "pembe" },
					{ label: "Kırmızı", value: "kırmızı" },
					{ label: "Mavi", value: "mavi" },
					{ label: "Mor", value: "mor" },
					{ label: "Beyaz", value: "beyaz" },
					{ label: "🗑️ Kaldır", value: "kaldır3" },
				])
		);
		message.channel.send({ content: "Aşağıdaki menüye tıklayarak dilediğin rengi seçebilirsin!", components: [menu] });
	}
});

client.on("interactionCreate", async (menu) => {
	if (!menu.isSelectMenu()) return;

	const data = await sunucuayar.findOne({ guildID: ayarlar.guildID });
	let cekilisRolü = data.CEKILIS;
	let etkinlikRolü = data.ETKINLIK;
	let loversRolü = data.LOVERS;
	let aloneRolü = data.ALONE;
	let kirmiziRolü = data.KIRMIZI;
	let beyazRolü = data.BEYAZ;
	let pembeRolü = data.PEMBE;
	let morRolü = data.MOR;
	let maviRolü = data.MAVI;
	let boosterRolü = data.BOOSTER;
	if (menu.customId === "etkinlikmenu") {
		if (menu.values[0] === "cekilis") {
			if (!menu.member.roles.cache.has(cekilisRolü)) {
				await menu.member.roles.add(cekilisRolü).catch(() => {});
				await menu.reply({ content: `${ayarlar.green} Başarıyla \`🎉 Çekiliş Katılımcısı\` rolünü üzerinize aldınız.`, ephemeral: true });
			} else {
				await menu.reply({ content: `${ayarlar.red} Uyarı \`🎉 Çekiliş Katılımcısı\` rolü üzerinizde bulunmakta!`, ephemeral: true });
			}
		} else {
			if (menu.values[0] === "etkinlik") {
				if (!menu.member.roles.cache.has(etkinlikRolü)) {
					await menu.member.roles.add(etkinlikRolü).catch(() => {});
					await menu.reply({ content: `${ayarlar.green} Başarıyla \`🎊 Etkinlik Katılımcısı\` rolünü üzerinize aldınız.`, ephemeral: true });
				} else {
					await menu.reply({ content: `${ayarlar.red} Uyarı \`🎊 Etkinlik Katılımcısı\` rolü üzerinizde bulunmakta!`, ephemeral: true });
				}
			} else {
				if (menu.values[0] === "kaldır") {
					await menu.member.roles.remove(cekilisRolü);
					await menu.member.roles.remove(etkinlikRolü);
					await menu.reply({ content: `${ayarlar.green} Katılımcı rolleri üzerinizden alındı.`, ephemeral: true });
				}
			}
		}
	} else if (menu.customId === "iliskimenu") {
		if (menu.values[0] === "lovers") {
			if (!menu.member.roles.cache.has(loversRolü)) {
				await menu.member.roles.add(loversRolü).catch(() => {});
				await menu.reply({ content: `${ayarlar.green} Başarıyla \`❤️ Lovers\` rolünü üzerinize aldınız.`, ephemeral: true });
			} else {
				await menu.reply({ content: `${ayarlar.red} Uyarı \`❤️ Lovers\` rolü üzerinizde bulunmakta!`, ephemeral: true });
			}
		} else {
			if (menu.values[0] === "alone") {
				if (!menu.member.roles.cache.has(aloneRolü)) {
					await menu.member.roles.add(aloneRolü).catch(() => {});
					await menu.reply({ content: `${ayarlar.green} Başarıyla \`💔 Alone\` rolünü üzerinize aldınız.`, ephemeral: true });
				} else {
					await menu.reply({ content: `${ayarlar.red} Uyarı \`💔 Alone\` rolü üzerinizde bulunmakta!`, ephemeral: true });
				}
			} else {
				if (menu.values[0] === "kaldır2") {
					await menu.member.roles.remove(loversRolü);
					await menu.member.roles.remove(aloneRolü);
					await menu.reply({ content: `${ayarlar.green} İlişki rolleri üzerinizden alındı.`, ephemeral: true });
				}
			}
		}
	} else if (menu.customId === "renkmenu") {
		if (menu.values[0] === "pembe") {
			if (!menu.member.roles.cache.get(boosterRolü)) return menu.reply({ content: "Booster üye olman gerek!", ephemeral: true });
			if (!menu.member.roles.cache.has(pembeRolü)) {
				await menu.member.roles.add(pembeRolü).catch(() => {});
				await menu.reply({ content: `${ayarlar.green} Başarıyla \`Pembe\` rolünü üzerinize aldınız.`, ephemeral: true });
			} else {
				await menu.reply({ content: `${ayarlar.red} Uyarı \`Pembe\` rolü üzerinizde bulunmakta!`, ephemeral: true });
			}
		} else if (menu.values[0] === "kırmızı") {
			if (!menu.member.roles.cache.get(boosterRolü)) return menu.reply({ content: "Booster üye olman gerek!", ephemeral: true });
			if (!menu.member.roles.cache.has(kirmiziRolü)) {
				await menu.member.roles.add(kirmiziRolü).catch(() => {});
				await menu.reply({ content: `${ayarlar.green} Başarıyla \`Kırmızı\` rolünü üzerinize aldınız.`, ephemeral: true });
			} else {
				await menu.reply({ content: `${ayarlar.red} Uyarı \`Kırmızı\` rolü üzerinizde bulunmakta!`, ephemeral: true });
			}
		} else if (menu.values[0] === "mavi") {
			if (!menu.member.roles.cache.get(boosterRolü)) return menu.reply({ content: "Booster üye olman gerek!", ephemeral: true });
			if (!menu.member.roles.cache.has(maviRolü)) {
				await menu.member.roles.add(maviRolü).catch(() => {});
				await menu.reply({ content: `${ayarlar.green} Başarıyla \`Mavi\` rolünü üzerinize aldınız.`, ephemeral: true });
			} else {
				await menu.reply({ content: `${ayarlar.red} Uyarı \`Mavi\` rolü üzerinizde bulunmakta!`, ephemeral: true });
			}
		} else if (menu.values[0] === "mor") {
			if (!menu.member.roles.cache.get(boosterRolü)) return menu.reply({ content: "Booster üye olman gerek!", ephemeral: true });
			if (!menu.member.roles.cache.has(morRolü)) {
				await menu.member.roles.add(morRolü).catch(() => {});
				await menu.reply({ content: `${ayarlar.green} Başarıyla \`Mor\` rolünü üzerinize aldınız.`, ephemeral: true });
			} else {
				await menu.reply({ content: `${ayarlar.red} Uyarı \`Mor\` rolü üzerinizde bulunmakta!`, ephemeral: true });
			}
		} else if (menu.values[0] == "beyaz") {
			if (!menu.member.roles.cache.get(boosterRolü)) return menu.reply({ content: "Booster üye olman gerek!", ephemeral: true });
			if (!menu.member.roles.cache.has(beyazRolü)) {
				await menu.member.roles.add(beyazRolü).catch(() => {});
				await menu.reply({ content: `${ayarlar.green} Başarıyla \`Beyaz\` rolünü üzerinize aldınız.`, ephemeral: true });
			} else {
				await menu.reply({ content: `${ayarlar.red} Uyarı \`Beyaz\` rolü üzerinizde bulunmakta!`, ephemeral: true });
			}
		} else if (menu.values[0] === "kaldır3") {
			await menu.reply({ content: `${ayarlar.green} İlişki rolleri üzerinizden alındı.`, ephemeral: true });
			await menu.member.roles.remove([kirmiziRolü, beyazRolü, pembeRolü, maviRolü, morRolü]);
		}
	}
});

client.login(ayarlar.Token)




