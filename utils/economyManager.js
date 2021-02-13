const mysql = require('mysql2');
Discord = require("discord.js");
const config = require('../config');

module.exports = {
    generateEconomyEmbedError(language) {
        const globalEmbed = new Discord.MessageEmbed()
            .setTitle("Economy system error")
            .setColor(config.embed.color)
            .setDescription(language)
            .setFooter(config.embed.footer)
            .setURL(config.embed.url)
            .setThumbnail(config.embed.error.thumbnail)
            .setTimestamp()
        return globalEmbed
    },

    generateEconomyEmbedSystem(language) {
        const globalEmbed = new Discord.MessageEmbed()
            .setTitle("Economy system")
            .setColor(config.embed.color)
            .setDescription(language)
            .setFooter(config.embed.footer)
            .setURL(config.embed.url)
            .setThumbnail(config.embed.thumbnailglobal)
            .setTimestamp()
        return globalEmbed
    },
};
