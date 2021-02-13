const Command = require("../../base/Command.js"),
    Discord = require("discord.js");

class gcreate extends Command {

    constructor(client) {
        super(client, {
            name: "gcreate",
            dirname: "guild",
        });
    }

    async run(message, args, data, language) {
        const verifUser = {}
        const verifUserClan = await this.client.clanManager.verifClan(message.author.id, data.database)
        verifUser.user = verifUserClan
        if (verifUser.user === "true") return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu as deja un clan."))
        if (data.user.bronze < 1000) return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu dois avoir 1000 pieces de bronze pour creer un clan."))
        const filter = (m) => m.author.id === message.author.id;
        const opt = { max: 1, time: 90000, errors: ["time"] };
        message.channel.send(this.client.clanManager.generateClanSystemEmbed("Merci de fournir le nom du clan."))
        let collected = await message.channel.awaitMessages(filter, opt).catch(() => { });
        if (!collected || !collected.first()) return;
        const confName = collected.first().content;
        if (confName.length > 50) return message.channel.send(this.client.clanManager.generateClanEmbedError("Le nom du clan ne peut pas depasser 100 caracteres."))
        collected.first().delete().catch(() => { });
        message.channel.send(this.client.clanManager.generateClanSystemEmbed("Merci de fournir la description du clan."))
        collected = await message.channel.awaitMessages(filter, opt).catch(() => { });
        if (!collected || !collected.first()) return
        const confDescription = collected.first().content;
        if (confDescription.length > 100) return message.channel.send(this.client.clanManager.generateClanEmbedError("La description du clan ne peut pas depasser 100 caracteres"))
        collected.first().delete().catch(() => { });
        message.channel.send(this.client.clanManager.generateClanSystemEmbed("Le clan a été crée avec succes."));
        await data.database.query(`UPDATE player SET bronze = "${parseInt(data.user.bronze) - 1000}" WHERE id="${message.author.id}"`)
        await this.client.clanManager.createClan(confName, confDescription, message.author.id, data.database);
        await this.client.clanManager.addClan(message.author, data.database);
    }
}

module.exports = gcreate;