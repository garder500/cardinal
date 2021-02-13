const Command = require("../../base/Command.js"),
    Discord = require("discord.js"),
      fetch = require("node-fetch");
class train extends Command {

    constructor(client) {
        super(client, {
            name: "train",
            dirname: "pnj",
        });
    }

    async run(message, args, data, language) {
const filter = (m) => m.author.id === message.author.id;
        const opt = { max: 1, time: 90000, errors: ["time"] };
        message.channel.send(this.client.globalManager.generateGlobalSystemEmbed("Ecrivez votre question"))
        let collected = await message.channel.awaitMessages(filter, opt).catch(() => { });
        if (!collected || !collected.first()) return message.channel.send(this.client.globalManager.generateGlobalEmbedError("Recommencer"));
        let question = collected.first().content;
        if(question.length>500) return message.channel.send(this.client.globalManager.generateGlobalEmbedError("Recommencer la question doit faire moins de 1000 carractère"));
        message.channel.send(this.client.globalManager.generateGlobalSystemEmbed("Ecrivez l'élément de réponse"))
        collected = await message.channel.awaitMessages(filter, opt).catch(() => { });
        if (!collected || !collected.first()) return message.channel.send(this.client.globalManager.generateGlobalEmbedError("Recommencer"));
        let reponse = collected.first().content;
        if(reponse.length>250) return message.channel.send(this.client.globalManager.generateGlobalEmbedError("Recommencer la réponse doit faire moins de 250 carractère")) ;
message.channel.send(this.client.globalManager.generateGlobalSystemEmbed(`Vous avez appris à l'IA à répondre à la question : \`${question}\` par la réponse : \`${reponse}\``));
let texte = `apprend --${question} --${reponse}`
fetch(`https://minria.fr/api/chatbot?message="${encodeURIComponent(texte)}"&name="Noelle"&gender="femmale"&pseudo=${encodeURIComponent(message.author.username)}&train=yes`).then(res =>res.json()).then(json => {
    console.log(json)
}); 
    }
}

module.exports = train;