const Command = require("../../base/Command.js"),
    Discord = require("discord.js");

class gprofil extends Command {

    constructor(client) {
        super(client, {
            name: "gprofil",
            dirname: "guild",
        });
    }

    async run(message, args, data, language) {
        if (data.user.clan === 0) return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu n'appartiens a aucun clan."))
        const [memberclan] = await data.database.query(`SELECT * FROM player WHERE id = "${message.author.id}"`);
        const [clan] = await data.database.query(`SELECT * FROM clan WHERE clan_id = "${memberclan[0].clan}"`);
        if (!clan[0]) return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu n'appartiens a aucun clan."))
        const [clanmembres] = await data.database.query(`SELECT * FROM player WHERE clan = "${clan[0].clan_id}" && clan_status >= 2`);
        const [owner] = await data.database.query(`SELECT * FROM player WHERE id = "${clan[0].owner}"`);
        const array = []
        let lvl;
        let xprequired;
        for (let i = 0; i < clanmembres.length; i++) {
        lvl = parseInt(clanmembres[i].level)+1
        xprequired = (50 * (lvl*lvl)) + (400 * lvl) + 550
            array.push({
            name: clanmembres[i].prenom,
            value: `**» ID :** ${clanmembres[i].id}\n**» Level :** ${clanmembres[i].level}\n**» XP :** ${clanmembres[i].xp}/${xprequired}`,
            inline: true,
        })
        }
        let embed = {
            embed:{
                color: 0x0099ff,
                title: 'Profil de Clan',
                author: {
                    name: `${clan[0].name}`,
                    icon_url: message.guild.iconURL(),
                    url: message.guild.iconURL(),
                    },
                description:`**» Description :** \n${clan[0].description}\n**» Owner :**  \n👑 ${owner[0].prenom}\n **» ID clan :** ${clan[0].clan_id}`,
                    fields: array,
            timestamp: new Date(),
            }
        }
        message.channel.send(embed);
    }
}

module.exports = gprofil;