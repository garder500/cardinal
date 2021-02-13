const Command = require("../../base/Command.js"),
    Discord = require("discord.js");

class gkick extends Command {

    constructor(client) {
        super(client, {
            name: "gkick",
            dirname: "guild",
        });
    }

    async run(message, args, data, language) {
        let mention = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        if(!mention) return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu dois mentionner une personne ou fournir son id."))
        if (data.user.clan === 0) return message.channel.send(this.client.clanManager.generateClanEmbedError("Vous ne faites partie d'aucun clan."))
        const [memberclan] = await data.database.query(`SELECT * FROM player WHERE id = "${message.author.id}"`);
        const [clan] = await data.database.query(`SELECT * FROM clan WHERE clan_id = "${memberclan[0].clan}"`);
        if (!clan[0]) return message.channel.send(this.client.clanManager.generateClanEmbedError("Ce clan n'existe pas"))
        if (parseInt(memberclan[0].clan_status) < 3)  return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu n'as pas assez de permissions dans le clan pour utiliser cette commande."))
        await this.client.findOrCreateUser(mention);
        const [user] = await data.database.query(`SELECT * FROM player WHERE id = "${mention.id}"`);
        if(user[0].clan !== memberclan[0].clan)  return message.channel.send(this.client.clanManager.generateClanEmbedError("Vous ne pouvez pas exclure des membres qui ne font pas parti de votre clan"))
        if (user[0].clan_status >= memberclan[0].clan_status) return message.channel.send(this.client.clanManager.generateClanEmbedError("Vous ne pouvez pas exclure des membres qui sont au même niveau d'autorité que vous ou supérieur"))
        await data.database.query(`UPDATE player SET clan_status = "0", clan = "0"  WHERE id = "${mention.id}"`);
        let embed = new Discord.MessageEmbed()
            .setAuthor(`${clan[0].name} || ${clan[0].clan_id}`)
            .setDescription(`**» Le membre ${user[0].prenom} ${user[0].nom} vient d'être exclus du clan**`)
        message.channel.send(embed);
    }
}

module.exports = gkick;