const Command = require("../../base/Command.js"),
    Discord = require("discord.js"),
    canvacord = require("canvacord");

class tww extends Command {

    constructor(client) {
        super(client, {
            name: "tww",
            dirname: "user",
        });
    }

    async run(message, args, data, language) {
        let client = this.client;
if(message.guild.me.hasPermission("MANAGE_WEBHOOKS") && message.guild.me.hasPermission("MANAGE_MESSAGES")){
    if(!args[0]) return message.channel.send({
            embed: {
                title: "<a:valid:773202778763427864> Status WebHook",
                color: 0x20d166,
                timestamp: new Date(),
                description: `WebHook stats : ${data.user.webhook}`,
                footer: {
                    text: client.user.username,
                    icon_url: client.user.displayAvatarURL()
                }
            }
        })
    if(args[0] == "on"){
        if(data.user.webhook == "true") return message.channel.send("Le mode webhook est déja activé")
        if(message.guild.id === "768574060140822539"){
            if(message.guild.members.cache.get(message.author.id).roles.cache.has("768743258242285578")){
            }else{
               message.guild.members.cache.get(message.author.id).roles.add("768743258242285578") 
            }
        }
    await data.database.query(`UPDATE player SET webhook = 'true' WHERE id = "${message.author.id}"`)
         message.channel.fetchWebhooks().then(webhooks3=>{
        const webhook3 = webhooks3.first();
        if(!webhooks3){
       message.channel.createWebhook(client.user.username,
                {avatar : client.user.displayAvatarURL,
                reason: `Création de webhook par : ${message.author.tag}`
            })
         }
        })
         message.channel.send({
            embed: {
                title: "<a:valid:773202778763427864> Commande effectuer",
                color: 0x20d166,
                timestamp: new Date(),
                description: `WebHook mode activé ! (Tout vos message deviendrons un WebHook avec le personnage de votre fiche)`,
                footer: {
                    text: client.user.username,
                    icon_url: client.user.displayAvatarURL()
                }
            }
        })
            }else if(args[0] == "off"){
                 if(data.user.webhook == "false") return message.channel.send("Le mode webhook est déja désactivé")
                    await data.database.query(`UPDATE player SET webhook = 'false' WHERE id = "${message.author.id}"`)
                     message.channel.send({
            embed: {
                title: "<a:error:773202660211163166> Commande effectuer",
                color: 0x20d166,
                timestamp: new Date(),
                description: `WebHook mode désactivé ! (Aucun webhook ne sera créer)`,
                footer: {
                    text: client.user.username,
                    icon_url: client.user.displayAvatarURL()
                }
            }
        })
            }else{
                message.channel.send("L'argument désiré n'as pas été trouvé vous devez entré `tww on` ou `tww off`")
            }
        }else{
            message.channel.send({
    embed: {
        title: "<a:error:773202660211163166> Erreur",
        color: 0xe71619,
        timestamp: new Date(),
        description: `Il me manque les permissions : \`MANAGE_WEBHOOKS(Gérer les WebHooks)\`,\`MANAGE_MESSAGES(Gérer les messages)\`\nDemandez à un adminstrateur pour qu'il me les ajoute\nOu bien directement au fondateur du serveur : ${message.guild.owner.user.tag}`,
        footer: {
            text: client.user.username,
            icon_url: client.user.displayAvatarURL()
        }
    }
})
        }
       
            
    }
}

module.exports = tww;