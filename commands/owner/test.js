const Command = require("../../base/Command.js"),
    Discord = require("discord.js"),
    object = require("../../object"),
        config = require("../../config");
class test extends Command {

    constructor(client) {
        super(client, {
            name: "test",
            dirname: "owner",
        });
    }

    async run(message, args, data, language) {
        let user = data.user
           let owner = config.ownerID
           let client = this.client
       if(owner.includes(message.author.id)){
        if(args[0] === "show"){
        let inventory = "";
        if(user.inventaire === null){
            inventory = "Votre inventaire est vide"
        }else{
            let invtest = JSON.parse(user.inventaire)
            for(let i= 0;i< invtest.item.length;i++){
              inventory += `${invtest.item[i].emoji}|${invtest.item[i].name}\n Durabilité : ${invtest.item[i].durability}\n\n`
            }
        }
            
            const embed = {
                embed: {
                    title: `Inventaire show`,
                    thumbnail: {
                        url: `${user.image}`,
                    },
                    description: `${inventory}`,
                }
            }
            await message.channel.send(embed)
        }else if(args[0] === "push"){
            let fakeinv = JSON.stringify(object)
            let inv =await data.database.escape(fakeinv)
            await data.database.query(`UPDATE player SET inventaire = ${inv} WHERE id = ${message.author.id}`)
            
            const embed = {
                embed: {
                    title: `Inventaire update`,
                    thumbnail: {
                        url: `${user.image}`,
                    },
                    description: `Vous avez envoyé toute les donné de object.js dans votre inventaire`,
                }
            }
            await message.channel.send(embed)
        }else{
              await message.channel.send({
        embed: {
            title: "Erreur",
            color: 0xf36636,
            timestamp: new Date(),
            description: "Vous devez utilisez l'argument `push` ou `show`",
            footer: {
                text: client.user.username,
                icon_url:client.user.displayAvatarURL()
            }
        }
        })
        }
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

module.exports = test;