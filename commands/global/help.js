const Command = require("../../base/Command.js"),
    Discord = require("discord.js");

class help extends Command {

    constructor(client) {
        super(client, {
            name: "help",
            dirname: "global",
        });
    }

    async run(message, args, data, language) {
        await message.channel.send({
            embed: {
                color: 0x14a1c5,
                title: `Voici mes commandes`,
                thumbnail: {
                    url: this.client.user.displayAvatarURL()
                },
                description: `Si une commande ne répond pas, c'est que le profil à été deconnecté suite à un restart du bot réeffectuer simplement la commande ^^`,
                fields: [
                    {
                        name: `Informations`,
                        value: this.client.commands.filter((command) => command.help.category === "global").map((command) => `\`${command.help.name}\``).join(' • ')
                    },
                    {
                        name: `Clans`,
                        value: this.client.commands.filter((command) => command.help.category === "guild").map((command) => `\`${command.help.name}\``).join(' • ')
                    },
                    {
                        name: `Utilisateurs`,
                        value: this.client.commands.filter((command) => command.help.category === "user").map((command) => `\`${command.help.name}\``).join(' • ')
                    },
                    {
                        name: `Economies`,
                        value: this.client.commands.filter((command) => command.help.category === "economie").map((command) => `\`${command.help.name}\``).join(' • ')
                    },
                ],
                footer: {
                    text: `${this.client.user.username} Certain emojis viennent de flaticon.com`,
                    icon_url: this.client.user.displayAvatarURL()
                }

            }
        })
    }
}

module.exports = help;