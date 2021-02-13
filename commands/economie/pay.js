const Command = require("../../base/Command.js"),
    Discord = require("discord.js");

class pay extends Command {

    constructor(client) {
        super(client, {
            name: "pay",
            dirname: "economie",
        });
    }

    async run(message, args, data, language) {
        const mention = message.mentions.users.first() || this.client.users.cache.get(args[0])
        if (!mention) return message.channel.send(this.client.economyManager.generateEconomyEmbedError("Tu dois mentionner une personne ou fournir son id."))
        var type = args[1]
        const typename = args[1]
        await this.client.findOrCreateUser(mention);
        if(message.author.id === mention.id) return message.channel.send(this.client.economyManager.generateEconomyEmbedError("Vous ne pouvez pas vous donnez de l'argent à vous même !"));
        if (!["bronze", "argent", "or"].includes(type)) return message.channel.send(this.client.economyManager.generateEconomyEmbedError("Merci de fournir le type de monnaie. (bronze/argent/or)"));
        const pay = args[2]
        if(!pay) return message.channel.send(this.client.economyManager.generateEconomyEmbedError("Tu dois fournir un montant a donner."))
        if(Number.isNaN(pay) || parseInt(pay) < 1) return message.channel.send(this.client.economyManager.generateEconomyEmbedError("Tu dois fournir un montant valide et qui ne soit pas inférieur ou égal à zéro."))
        const or = data.user.gold;
        const argent = data.user.argent;
        const bronze = data.user.bronze
        if(type === "bronze") type = bronze;
        if(type === "argent") type = argent;
        if(type === "or") type = or;
        if(pay > type) return message.channel.send(this.client.economyManager.generateEconomyEmbedError(`Tu n'as pas de \`${typename}\``));
        const [selected] =  await data.database.query(`SELECT * FROM player WHERE id= "${mention.id}" `);

         if(typename === "bronze"){
            await data.database.query(`UPDATE player SET bronze = "${parseInt(type)-parseInt(pay)}" WHERE id="${message.author.id}"`)
            await data.database.query(`UPDATE player SET bronze = "${parseInt(selected[0].bronze) + parseInt(pay)}" WHERE id="${mention.id}"`)
         }
        if(typename === "argent"){
            await data.database.query(`UPDATE player SET argent = "${parseInt(type)-parseInt(pay)}" WHERE id="${message.author.id}"`)
            await data.database.query(`UPDATE player SET argent = "${parseInt(selected[0].argent) + parseInt(pay)}" WHERE id="${mention.id}"`)
        }
        if(typename === "or"){
            await data.database.query(`UPDATE player SET gold = "${parseInt(type)-parseInt(pay)}" WHERE id="${message.author.id}"`)
            await data.database.query(`UPDATE player SET gold = "${parseInt(selected[0].gold) + parseInt(pay)}" WHERE id="${mention.id}"`)        }
        message.channel.send(this.client.economyManager.generateEconomyEmbedSystem("Transactions effectués avec succes."))
        
    }
}

module.exports = pay;