const Command = require("../../base/Command.js"),
    Discord = require("discord.js");

class gdelete extends Command {

    constructor(client) {
        super(client, {
            name: "gdelete",
            dirname: "guild",
        });
    }

    async run(message, args, data, language) {
        const verifUser = {}
        const verifUserClan = await this.client.clanManager.verifClan(message.author.id, data.database)
        verifUser.user = verifUserClan
        if (verifUser.user === "false") return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu n'appartiens a aucun clan.")) 
        const memberclan = data.user.clan
        const [clan] =  await data.database.query(`SELECT * FROM clan WHERE clan_id = "${memberclan}"`);
        if(clan[0].owner !== message.author.id) return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu dois etre l'owner du clan pour utiliser cette commande"))
        message.channel.send(this.client.clanManager.generateClanSystemEmbed("Etes vous sur de vouloir supprimer le clan ?\n\n\`oui\` pour quitter \`non\`"))
        const filter = (m) => m.author.id === message.author.id;
        const opt = { max: 1, time: 90000, errors: ["time"] };
        let collected = await message.channel.awaitMessages(filter, opt).catch(() => { });
        if (!collected || !collected.first()) return;
        const validation = collected.first().content;
        if (validation === "oui") {
            message.channel.send(this.client.clanManager.generateClanSystemEmbed("Le clan a été supprimé avec succes."))
            await this.client.clanManager.deleteClan(data.user.clan, data.database);
        }
        if (validation === "non") {
            message.channel.send(this.client.clanManager.generateClanSystemEmbed("La demande a été annulé."))
        }
    }
}

module.exports = gdelete;