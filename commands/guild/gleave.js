const Command = require("../../base/Command.js"),
    Discord = require("discord.js");
const mysql = require('mysql2');

class gleave extends Command {

    constructor(client) {
        super(client, {
            name: "gleave",
            dirname: "guild",
        });
    }

    async run(message, args, data, language) {
        const [mentionmemberclan] = await data.database.query(`SELECT * FROM player WHERE id = "${message.author.id}"`);
        if (mentionmemberclan[0].clan === 0) return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu n'appartiens a aucun clan."))
        const [clan] = await data.database.query(`SELECT * FROM clan WHERE clan_id = "${mentionmemberclan[0].clan}"`);
        if (clan[0].owner === message.author.id) return message.channel.send(this.client.clanManager.generateClanEmbedError("Vous ne pouvez pas quitter votre propre clan."))
        message.channel.send(this.client.clanManager.generateClanSystemEmbed("Es tu sur de vouloir quitter le clan ?\n ** Veuillez tapper \`oui\` pour quitter \`non\` pour annuler !**"));
        await message.channel.awaitMessages(r => r.author.id === message.author.id, { max: 1, time: 20000, errors: ['time'] }).then(async (collected) => {
            collected.first().delete().catch();
            if (collected.first().content === 'oui') {
                await data.database.query(`UPDATE player SET clan = "0" WHERE id = "${message.author.id}"`)
                await message.channel.send(this.client.clanManager.generateClanSystemEmbed(`**${collected.first().author} Vous venez de quitter le clan ${clan[0].name} !**`));
            }
            if (collected.first().content === 'non') {
                message.channel.send(this.client.clanManager.generateClanSystemEmbed("Votre demande a été annulé."));
            } else if (collected.first().content == 'Oui' && collected.first().content !== 'Non') {
                return message.channel.send(this.client.clanManager.generateClanSystemEmbed('**Veuillez tapper \`oui\` pour quitter \`non\` pour annuler !**'));
            }
        });
    }
}

module.exports = gleave;