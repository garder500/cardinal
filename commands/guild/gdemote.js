const Command = require("../../base/Command.js"),
    Discord = require("discord.js");

class gdemote extends Command {

    constructor(client) {
        super(client, {
            name: "gdemote",
            dirname: "guild",
        });
    }

    async run(message, args, data, language) {
        let mention = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        if(!mention) return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu dois mentionner une personne ou fournir son id."))  
        if (data.user.clan === 0) return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu n'appartiens a aucun clan"))
        const [memberclan] = await data.database.query(`SELECT * FROM player WHERE id = "${message.author.id}"`);
        const [clan] = await data.database.query(`SELECT * FROM clan WHERE clan_id = "${memberclan[0].clan}"`);
        if (!clan[0]) return message.channel.send(this.client.clanManager.generateClanEmbedError("Ce clan n'existe pas."))
        if (parseInt(memberclan[0].clan_status) !== 4) return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu n'as pas assez de permissions dans le clan pour utiliser cette commande."))
        const [postulant] = await data.database.query(`SELECT * FROM player WHERE clan = "${clan[0].clan_id}" && clan_status = "3"`);
        const array2 = []
        for (let i = 0; i < postulant.length; i++) {
            array2.push(postulant[i].id)
        }
        if (array2.length === 0) return message.channel.send(this.client.clanManager.generateClanEmbedError("Vous n'avez aucun adjoint à retrogradé"))
        if (!array2.includes(mention.id)) return message.channel.send(this.client.clanManager.generateClanEmbedError("L'identifiant rentré ne fait pas parti des adjoint de votre clan"))
        await data.database.query(`UPDATE player SET clan_status = "2" WHERE id = "${mention.id}"`);
        const [user] = await data.database.query(`SELECT * FROM player WHERE id = "${mention.id}"`);
        let embed = new Discord.MessageEmbed()
            .setAuthor(`${clan[0].name} || ${clan[0].clan_id}`)
            .setDescription(`**» L'adjoint ${user[0].prenom} ${user[0].nom} vient d'être rétrogradé membre au sein du clan**`)
        message.channel.send(embed);
    }
}

module.exports = gdemote;