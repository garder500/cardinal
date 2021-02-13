const Command = require("../../base/Command.js"),
    Discord = require("discord.js"),
    config = require("../../config");

class restart extends Command {

    constructor(client) {
        super(client, {
            name: "restart",
            dirname: "owner",
        });
    }

    async run(message, args, data, language) {
        let owner = config.ownerID
        let client = this.client
       if(owner.includes(message.author.id)){
await message.channel.send({
            embed: {
                title: "Bot en redemarrage",
                color: 0x20d166,
                timestamp: new Date(),
                description: `Le bot redemarre dans 2 secondes`,
                footer: {
                    text: client.user.username,
                    icon_url: client.user.displayAvatarURL()
                }
            }
        })
        setTimeout(() => {
        client.destroy()
                setTimeout(() => {
        process.exit(1);
          },2000)
        },2000)
    }else{
          await message.channel.send({
        embed: {
            title: "Erreur",
            color: 0xf36636,
            timestamp: new Date(),
            description: "Vous n'êtes pas autorisé à utilisé cette commande",
            footer: {
                text: client.user.username,
                icon_url:client.user.displayAvatarURL()
            }
        }
        })
      }
    }
}

module.exports = restart;