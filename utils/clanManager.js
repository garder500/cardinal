const mysql = require('mysql2');
Discord = require("discord.js");
const config = require('../config');

module.exports = {
    async createClan(name, description, owner_id, database) {
        await database.query(`INSERT INTO clan (name,description,owner) VALUES (${database.escape(name)},${database.escape(description)},'${owner_id}')`);
        await database.query(`UPDATE player SET clan_status = "4" WHERE id = "${owner_id}"`);
    },

    async deleteClan(clan_id, database) {
        await database.query(`DELETE FROM clan WHERE clan_id = "${clan_id}"`);
        await database.query(`UPDATE player SET clan = "0", clan_status = "0" WHERE clan = "${clan_id}"`);
    },

    async verifClan(user, database) {
        const [memberclan] = await database.query(`SELECT * FROM player WHERE id = "${user}"`);
        const [clan] = await database.query(`SELECT * FROM clan WHERE clan_id = "${memberclan[0].clan}"`);
        if (clan && clan[0]) {
            if (clan[0].owner) {
                return "true"
            } else {
                return "false"
            }
        } else {
            return "false"
        }
    },

    async addClan(user, database) {
        const data = {}
        const [clan] = await database.query(`SELECT * FROM clan WHERE owner = "${user.id}"`);
        if (clan && clan[0]) {
            data.clan = clan[0];
            await database.query(`UPDATE player SET clan = ${data.clan.clan_id} WHERE id = '${user.id}'`)
        }
    },

    generateClanEmbedError(language) {
        const clanEmbed = new Discord.MessageEmbed()
            .setTitle("Clan system error")
            .setColor(config.embed.color)
            .setDescription(language)
            .setFooter(config.embed.footer)
            .setURL(config.embed.url)
            .setThumbnail(config.embed.error.thumbnail)
            .setTimestamp()
        return clanEmbed
    },

    generateClanSystemEmbed(language) {
        const clanEmbed = new Discord.MessageEmbed()
            .setTitle("Clan system")
            .setColor(config.embed.color)
            .setDescription(language)
            .setFooter(config.embed.footer)
            .setURL(config.embed.url)
            .setThumbnail(config.embed.thumbnailclan)
            .setTimestamp()
        return clanEmbed
    },
};
