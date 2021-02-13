const Command = require("../../base/Command.js"),
    Discord = require("discord.js");
const mysql = require('mysql2');

class gjoin extends Command {

    constructor(client) {
        super(client, {
            name: "gjoin",
            dirname: "guild",
        });
    }

    async run(message, args, data, language) {
        const [mentionmemberclan] = await data.database.query(`SELECT * FROM player WHERE id = "${message.author.id}"`);
        if (mentionmemberclan[0].clan !== 0) return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu fait déja parti d'un clan."));
        const [clan] = await data.database.query(`SELECT * FROM clan WHERE clan_id = "${args[0]}"`);
        if (!clan[0]) return message.channel.send(this.client.clanManager.generateClanEmbedError("Ce clan n'existe pas."));
        const [clantotal] = await data.database.query(`SELECT * FROM player WHERE clan = "${clan[0].clan_id}" && clan_status >= "2"`);
        if (clantotal.length == 25) return message.channel.send(this.client.clanManager.generateClanEmbedError("Ce clan est deja complet. (25 membres maximum)"))
        await data.database.query(`UPDATE player SET clan = "${args[0]}", clan_status = "1" WHERE id = "${message.author.id}"`);
        message.channel.send(this.client.clanManager.generateClanSystemEmbed("Votre demande pour rejoindre ce clan a été envoyé, merci d'attendre qu'un staff du clan valide"))
    }
}

module.exports = gjoin;