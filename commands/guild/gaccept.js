const Command = require("../../base/Command.js"),
    Discord = require("discord.js");

class gaccept extends Command {

    constructor(client) {
        super(client, {
            name: "gaccept",
            dirname: "guild",
        });
    }

    async run(message, args, data, language) {
        let mention = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        if (!mention) return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu dois mentionner une personne ou fournir son id."))
        if (data.user.clan === 0) return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu n'appartiens a aucun clan."))
        const [memberclan] = await data.database.query(`SELECT * FROM player WHERE id = "${message.author.id}"`);
        const [clan] = await data.database.query(`SELECT * FROM clan WHERE clan_id = "${memberclan[0].clan}"`);
        if (!clan[0]) return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu n'appartiens a aucun clan."))
        if (parseInt(memberclan[0].clan_status) < 3) return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu n'as pas assez de permissions dans le clan pour utiliser cette commande."))
        const [clantotal] = await data.database.query(`SELECT * FROM player WHERE clan = "${clan[0].clan_id}" && clan_status >= "2"`);
        const [postulant] = await data.database.query(`SELECT * FROM player WHERE clan = "${clan[0].clan_id}" && clan_status = "1"`);
        const array2 = []
        for (let i = 0; i < postulant.length; i++) {
            array2.push(postulant[i].id)
        }
        if (clantotal.length == 25) return message.channel.send(this.client.clanManager.generateClanEmbedError("Le clan est complet (25 personnes maximum)."))
        if (array2.length === 0) return message.channel.send(this.client.clanManager.generateClanEmbedError("Vous n'avez aucune demande pour rejoindre le clan actuellement."))
        if (!array2.includes(mention.id)) return message.channel.send(this.client.clanManager.generateClanEmbedError("Cette personne ne cherche pas a rejoindre le clan."))
        await data.database.query(`UPDATE player SET clan_status = "2" WHERE id = "${args[0]}"`);
        const [user] = await data.database.query(`SELECT * FROM player WHERE id = "${args[0]}"`);
        let embed = new Discord.MessageEmbed()
            .setAuthor(`${clan[0].name} || ${clan[0].clan_id}`)
            .setDescription(`**» ${user[0].prenom} ${user[0].nom} vient de rejoindre le clan.**`)
        message.channel.send(embed);
    }
}

module.exports = gaccept;