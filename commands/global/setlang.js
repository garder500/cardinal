const Command = require("../../base/Command.js"),
    Discord = require("discord.js");

class language extends Command {

    constructor(client) {
        super(client, {
            name: "language",
            dirname: "SOON...",
        });
    }

    async run(message, args, data, language) {
        if (!["fr", "en"].includes(args[0])) return message.channel.send(this.client.globalManager.generateGlobalEmbedError(language.global.error.langerror));
        await data.database.query(`UPDATE player SET language = "${args[0]}" WHERE id = "${message.author.id}"`);
        message.channel.send(this.client.globalManager.generateGlobalSystemEmbed(language.global.langyes));
    }
}

module.exports = language;