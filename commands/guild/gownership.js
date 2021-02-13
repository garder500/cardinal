const Command = require("../../base/Command.js"),
    Discord = require("discord.js");
const mysql = require('mysql2');
const { lang } = require("moment");

class gownership extends Command {

    constructor(client) {
        super(client, {
            name: "gownership",
            dirname: "guild",
        });
    }

    async run(message, args, data, language) {
        let mention = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        if(!mention) return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu dois mentionner une personne ou fournir son id."))        
        const [owner] = await data.database.query(`SELECT * FROM player WHERE id = "${message.author.id}"`);
        if (owner[0].clan === 0) return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu n'appartiens a aucun clan."));
        const [clanmembres] = await data.database.query(`SELECT * FROM player WHERE clan = "${owner[0].clan}" && id = "${mention.id}" && clan_status >= "2"`);
        const [clan] = await data.database.query(`SELECT * FROM clan WHERE clan_id = "${owner[0].clan}"`);
        if (clan[0].owner !== owner[0].id) return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu dois etre l'owner du clan pour utiliser cette commande."));
        if (!clanmembres[0]) return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu n'appartiens a aucun clan."));
        let o = Math.floor(Math.random() * 8) + 1;
        let t = Math.floor(Math.random() * 8) + 1;
        let th = Math.floor(Math.random() * 8) + 1;
        let f = Math.floor(Math.random() * 8) + 1;
        let number = `${o}${t}${th}${f}`;
        message.channel.send(this.client.clanManager.generateClanSystemEmbed(`Merci de remplir le captcha pour continuer :\n\n\`${number}\``));
        await message.channel.awaitMessages(r => r.author.id === message.author.id, { max: 1, time: 10000, errors: ['time'] }).then(async (c) => {
            let collected = c.first();
            if (collected.content === number) {
                await data.database.query(`UPDATE clan SET owner = "${mention.id}" WHERE clan_id = "${owner[0].clan}"`);
                await data.database.query(`UPDATE player SET clan_status = "3" WHERE id = "${message.author.id}"`);
                await data.database.query(`UPDATE player SET clan_status = "4" WHERE id = "${mention.id}"`);
                await message.channel.send(this.client.clanManager.generateClanSystemEmbed("La transfert de propriété a bien été fait."))
            } else
                if (collected.content !== number) {
                    await message.channel.send(this.client.clanManager.generateClanSystemEmbed("Votre demande a été annulé"))
                }
        });
    }
}

module.exports = gownership;