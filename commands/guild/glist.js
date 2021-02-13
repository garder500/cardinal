const Command = require("../../base/Command.js"),
    Discord = require("discord.js");
const mysql = require('mysql2');

class glist extends Command {

    constructor(client) {
        super(client, {
            name: "glist",
            dirname: "guild",
        });
    }

    async run(message, args, data, language) {
        if (data.user.clan === 0) return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu n'appartiens a aucun clan."))
        const [memberclan] = await data.database.query(`SELECT * FROM player WHERE id = "${message.author.id}"`);
        const [clan] = await data.database.query(`SELECT * FROM clan WHERE clan_id = "${memberclan[0].clan}"`);
        if (!clan[0]) return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu n'appartiens a aucun clan."))
        if (parseInt(memberclan[0].clan_status) < 3) return message.channel.send(this.client.clanManager.generateClanEmbedError("Tu n'as pas assez de permissions dans le clan pour utiliser cette commande."))
        const [postulant] = await data.database.query(`SELECT * FROM player WHERE clan = "${clan[0].clan_id}" && clan_status = "1"`);
        const array2 = [];
        let lvl;
        let xprequired;
        for (let i = 0; i < postulant.length; i++) {
        if(i > 24){
        }else{
        lvl = parseInt(postulant[i].level)+1
        xprequired = (50 * (lvl*lvl)) + (400 * lvl) + 550
            array2.push({
            name: postulant[i].prenom,
            value: `**» ID :** ${postulant[i].id}\n**» Level :** ${postulant[i].level}\n**» XP :** ${postulant[i].xp}/${xprequired}`,
            inline: true,
        })
        }
        }
        if (array2.length == 0) {
            array2.push({
            name: "Postulants",
            value: `Aucun postulants`,
            inline: true,
        })
        }
        let embed = {
            embed:{
                color: 0x0099ff,
                title: 'Postulant au clan',
                author: {
                    name: `${clan[0].name}`,
                    icon_url: message.guild.iconURL(),
                    url: message.guild.iconURL(),
                    },
                description:`**» ID clan :** ${clan[0].clan_id}`,
                    fields: array2,
            timestamp: new Date(),
            }
        }
        message.channel.send(embed);
    }
}

module.exports = glist;