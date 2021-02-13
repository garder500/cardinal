const Command = require("../../base/Command.js"),
    Discord = require("discord.js"),
    canvacord = require("canvacord");

class invite extends Command {

    constructor(client) {
        super(client, {
            name: "invite",
            dirname: "global",
        });
    }

    async run(message, args, data, language) {
        let client = this.client;
         message.channel.send({
            embed: {
                color: 0x14a1c5,
                title: `Invite moi`,
                description: "> Pour m'invité avec toutes les permissions: [Clique ici](https://discord.com/api/oauth2/authorize?client_id=769614781043703810&permissions=8&scope=bot)\n\n> Pour inviter avec les permissions que vous voulez: [Clique ici](https://discord.com/api/oauth2/authorize?client_id=769614781043703810&permissions=2147483639&scope=bot)\n\n> Pour inviter sans aucune permissions: [Clique ici](https://discord.com/api/oauth2/authorize?client_id=769614781043703810&permissions=0&scope=bot)",
                thumbnail: {
                    url: client.user.displayAvatarURL(),
                },
                footer: {
                    text: "La révolution du RP démarre maintenant !",
                    icon_url: client.user.displayAvatarURL({ format: 'png', dynamic: true,})
                },
            }
        })
       
            
    }
}

module.exports = invite;