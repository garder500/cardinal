const Command = require("../../base/Command.js"),
    Discord = require("discord.js");

class gedit extends Command {

    constructor(client) {
        super(client, {
            name: "gedit",
            dirname: "guild",
        });
    }

    async run(message, args, data, language) {
        const [memberclan] = await data.database.query(`SELECT * FROM player WHERE id = "${message.author.id}"`);
        if (parseInt(memberclan[0].clan_status) < 3) return message.channel.send(this.client.clanManager.generateClanEmbedError("Vous n'avez pas les permissions requise pour effectuez cette action"))
        var filter = m => m.author.id === message.author.id;
        message.channel.send(this.client.clanManager.generateClanSystemEmbed("✏️ => Nom du clan\n📝 => Description du clan\n❌ => Annuler")).then(async c => {
            await c.react("✏️");
            await c.react("📝");
            await c.react("❌");
            const data_res = c.createReactionCollector((reaction, user) => user.id === message.author.id);
            data_res.on("collect", async (reaction) => {
                if (reaction.emoji.name === "✏️") {
                    message.channel.send(this.client.clanManager.generateClanSystemEmbed("Merci de fournir le nouveau nom du clan.")).then(i => {
                        message.channel.awaitMessages(filter, {
                            max: 1,
                            time: 20000,
                            errors: ["time"]
                        }).then(collected => {
                            const clanName =  data.database.escape(collected.first().content)
                            if (clanName.length > 50) return message.channel.send(this.client.clanManager.generateClanEmbedError("Le nom ne peut pas depasser 50 caracteres."));
                            data.database.query(`UPDATE clan SET name = ${clanName} WHERE clan_id = "${memberclan[0].clan}"`);
                            i.delete()
                            collected.first().delete();
                            return reaction.remove(message.author.id);
                        }).catch(() => {
                            return
                        });
                    })
                }
                if (reaction.emoji.name === "📝") {
                    message.channel.send(this.client.clanManager.generateClanSystemEmbed("Merci de fournir la nouvelle description du clan.")).then(i => {
                        message.channel.awaitMessages(filter, {
                            max: 1,
                            time: 20000,
                            errors: ["time"]
                        }).then(collected => {
                            const clanDescription = data.database.escape(collected.first().content)
                            if (clanDescription.length > 100) return message.channel.send(this.client.clanManager.generateClanEmbedError("La description ne peut pas depasser 100 caracteres."))
                            data.database.query(`UPDATE clan SET description = ${clanDescription} WHERE clan_id = "${memberclan[0].clan}"`);
                            i.delete()
                            collected.first().delete();
                            return reaction.remove(message.author.id);
                        }).catch(() => {
                            return
                        });
                    })
                }
                if (reaction.emoji.name === "❌") {
                    c.delete(c)
                }
            })
        })
    }
}

module.exports = gedit;