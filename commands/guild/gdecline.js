const Command = require("../../base/Command.js"),
    Discord = require("discord.js");

class gdecline extends Command {

    constructor(client) {
        super(client, {
            name: "gdecline",
            dirname: "guild",
        });
    }

    async run(message, args, data, language) {
        let mention = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        if(!mention) return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu dois mentionner une personne ou fournir son id."))
        if (data.user.clan === 0) return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu es dans aucun clan"))
        const [memberclan] = await data.database.query(`SELECT * FROM player WHERE id = "${message.author.id}"`);
        const [clan] = await data.database.query(`SELECT * FROM clan WHERE clan_id = "${memberclan[0].clan}"`);
        if (!clan[0]) return message.channel.send(this.client.clanManager.generateClanEmbedError("Ce clan n'existe pas"))
        if (parseInt(memberclan[0].clan_status) < 3) return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu n'as pas assez de permissions dans le clan pour utiliser cette commande."))
        const [clantotal] = await data.database.query(`SELECT * FROM player WHERE clan = "${clan[0].clan_id}" && clan_status >= "2"`);
        const [postulant] = await data.database.query(`SELECT * FROM player WHERE clan = "${clan[0].clan_id}" && clan_status = "1"`);
        const array2 = []
        for (let i = 0; i < postulant.length; i++) {
            array2.push(postulant[i].id)
        }
        if (clantotal.length == 25) return message.channel.send(this.client.clanManager.generateClanEmbedError("Impossible d'accepter cette personne le clan est déja plein"))
        if (array2.length === 0) return message.channel.send(this.client.clanManager.generateClanEmbedError("Personne ne cherche à rejoindre votre clan"))
        if (!array2.includes(id)) return message.channel.send(this.client.clanManager.generateClanEmbedError("L'identifiant rentré ne postule pas à votre clan !"))
        await data.database.query(`UPDATE player SET clan_status = "0", clan = "0"  WHERE id = "${id}"`);
        const [user] = await data.database.query(`SELECT * FROM player WHERE id = "${id}"`);
        let embed = new Discord.MessageEmbed()
            .setAuthor(`${clan[0].name} || ${clan[0].clan_id}`)
            .setDescription(`**» ${user[0].prenom} ${user[0].nom} vient d'etre refusé pour rejoindre le clan.**`)
        message.channel.send(embed);
    }
}

module.exports = gdecline;