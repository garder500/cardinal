const Command = require("../../base/Command.js"),
    Discord = require("discord.js");
const mysql = require('mysql2');

class ginvite extends Command {

    constructor(client) {
        super(client, {
            name: "ginvite",
            dirname: "guild",
        });
    }

    async run(message, args, data, language) {
        let mention = message.mentions.users.first();
        if(!mention) return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu dois mentionner une personne ou fournir son id."))  
        const [memberclan] = await data.database.query(`SELECT * FROM player WHERE id = "${message.author.id}"`);
        if (parseInt(memberclan[0].clan_status) < 2) return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu n'es dans aucun clan tu ne peux inviter personne"))
        const [mentionmemberclan] = await data.database.query(`SELECT * FROM player WHERE id = "${mention.id}"`);
        const [clan] = await data.database.query(`SELECT * FROM clan WHERE clan_id = "${memberclan[0].clan}"`);
        const [clanmembres] = await data.database.query(`SELECT * FROM player WHERE clan = "${memberclan[0].clan}"`);
        if (clanmembres.length == 25) return message.channel.send(this.client.clanManager.generateClanEmbedError(`Vous ne pouvez pas inviter cette personne car le clan est déja plein`));
        if (mentionmemberclan[0].clan !== 0) return message.channel.send(this.client.clanManager.generateClanEmbedError(`Vous ne pouvez pas inviter cette personne car la personne est déja dans un clan`));
        await message.channel.send(this.client.clanManager.generateClanSystemEmbed(`**${mention} Tu as été invité a rejoindre le clan ${clan[0].name}**\n\nPour acceder l'invitation tappez \`oui\` sinon tappez \`non\``));
        await message.channel.awaitMessages(r => r.author.id === mention.id, { max: 1, time: 20000, errors: ['time'] }).then(async (collected) => {
            collected.first().delete().catch(() => { });
            if (collected.first().content.toLowerCase() === 'oui') {
                await data.database.query(`UPDATE player SET clan = "${memberclan[0].clan}" , clan_status = "2" WHERE id = ${mention.id}`)
                await message.channel.send(this.client.clanManager.generateClanSystemEmbed(`**${collected.first().author} | Vous venez de rejoindre ${clan[0].name}!**`));
            }
            if (collected.first().content.toLowerCase() === 'non') {
                message.channel.send(this.client.clanManager.generateClanSystemEmbed(`**<@${message.author}> | L'invitation a été rejetée !**`));
            } else if (collected.first().content == 'Oui' && collected.first().content !== 'Non') {
                return message.channel.send(this.client.clanManager.generateClanSystemEmbed('**:x: | Veuillez tapper \`oui\` pour accepter ou \`non\` pour refuser !**'));
            }
        });
    }
}

module.exports = ginvite;