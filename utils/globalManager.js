const mysql = require('mysql2');
Discord = require("discord.js");
const config = require('../config');

module.exports = {
    generateGlobalEmbedError(language) {
        const globalEmbed = new Discord.MessageEmbed()
            .setTitle("Global system error")
            .setColor(config.embed.color)
            .setDescription(language)
            .setFooter(config.embed.footer)
            .setURL(config.embed.url)
            .setThumbnail(config.embed.error.thumbnail)
            .setTimestamp()
        return globalEmbed
    },

    generateGlobalSystemEmbed(language) {
        const globalEmbed = new Discord.MessageEmbed()
            .setTitle("Global system")
            .setColor(config.embed.color)
            .setDescription(language)
            .setFooter(config.embed.footer)
            .setURL(config.embed.url)
            .setThumbnail(config.embed.thumbnailglobal)
            .setTimestamp()
        return globalEmbed
    },
};
