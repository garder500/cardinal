const Command = require("../../base/Command.js"),
    Discord = require("discord.js");

class gpromote extends Command {

    constructor(client) {
        super(client, {
            name: "gpromote",
            dirname: "guild",
        });
    }

    async run(message, args, data, language) {
        let mention = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        if(!mention) return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu dois mentionner une personne ou fournir son id."))
        if (data.user.clan === 0) return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu n'appartiens a aucun clan."))
        const [memberclan] = await data.database.query(`SELECT * FROM player WHERE id = "${message.author.id}"`);
        const [clan] = await data.database.query(`SELECT * FROM clan WHERE clan_id = "${memberclan[0].clan}"`);
        if (!clan[0]) return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu n'appartiens a aucun clan."))
        if (parseInt(memberclan[0].clan_status) !== 4) return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu n'as pas assez de permissions dans le clan pour utiliser cette commande."))
        const [postulant] = await data.database.query(`SELECT * FROM player WHERE clan = "${clan[0].clan_id}" && clan_status = "2"`);
        const array2 = []
        for (let i = 0; i < postulant.length; i++) {
            array2.push(postulant[i].id)
        }
        if (array2.length === 0) return message.channel.send(this.client.clanManager.generateClanEmbedError("Il n'y a aucun membre dans ce clan."))
        if (!array2.includes(mention.id)) return message.channel.send(this.client.clanManager.generateClanEmbedError("Le membre ne fait pas partie du clan."))
        await data.database.query(`UPDATE player SET clan_status = "3" WHERE id = "${mention.id}"`);
        const [user] = await data.database.query(`SELECT * FROM player WHERE id = "${mention.id}"`);
        let embed = new Discord.MessageEmbed()
            .setAuthor(`${clan[0].name} || ${clan[0].clan_id}`)
            .setDescription(`**» Le membre ${user[0].prenom} ${user[0].nom} vient d'être promus Adjoint.**`)
        message.channel.send(embed);
    }
}

module.exports = gpromote;