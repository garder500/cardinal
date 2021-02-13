const Command = require("../../base/Command.js"),
    Discord = require("discord.js"),
      beautify = require("beautify");

class Eval extends Command {

    constructor(client) {
        super(client, {
            name: "eval",
            dirname: "owner",
        });
    }

    async run(message, args, data, language) {
        const client = this.client;
        const lt = client.users.cache.get('481842007963205633')
      const garder = client.users.cache.get('243117191774470146')
      const grality = client.users.cache.get('640302286463172628')
      const cardinal = client.users.cache.get('769614781043703810')
      function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
     if(message.author.id !== '769614781043703810' && message.author.id !== '481842007963205633' && message.author.id !== '243117191774470146' && message.author.id !== "640302286463172628") return message.channel.send({
         embed: {
             title: "<a:error:773202660211163166> Erreur",
             color: 0xe71619,
             timestamp: new Date(),
             description: `Seul \`${lt.tag}\`, \`${garder.tag}\`, \`${grality.tag}\` et \`${cardinal.tag}\`  sont autoriser a executer cette commande`,
             footer: {
                 text: client.user.username,
                 icon_url: client.user.displayAvatarURL()
             }
         }
     })
if(!args[0]) return message.channel.send({
  embed: {
      title: "<a:error:773202660211163166> Mauvaise utilisation",
      color: 0xf36636,
      timestamp: new Date(),
      description: "Veuillez indiquer un code a évaluer\n`$eval <code>`",
      footer: {
          text: client.user.username,
          icon_url: client.user.displayAvatarURL()
      }
  }
})
let code = args.slice(0).join(" ");
               
try {
let evaluer = eval(code);
let evaled = evaluer
 evaled = require("util").inspect(evaled);
let result;
if(evaled.length >= 1990){
  if(code.includes("client.socket")){
    result = evaled.length
  }else{
  if(!eval(code + ".cache")){
    if(!eval(code + ".size")){
      result = evaled.length
    }else{
      result = eval(code + ".size")
    }
  }else{
      result = eval(code + ".cache.size")
    }
  }
  evaled = evaled.substr(0,1900) + "... pour un total de "+ result + " résultats"
}
if(code.length > 1000){
  code = code.substr(0,1000) + "..."
}
if(args.slice(0).join(" ").toLowerCase().includes("token")) {
  const embed2 = {
    embed: {
        title: "<a:error:773202660211163166> Erreur",
        color: 0xe71619,
        timestamp: new Date(),
        description: `Vous ne pouvez pas voir le token du bot`,
        footer: {
            text: client.user.username,
            icon_url: client.user.displayAvatarURL()
        }
    }
}
  return message.channel.send(embed2)
}

message.channel.send({
    embed: {
        title: "<a:valid:773202778763427864> Réponse :",
        color: 0x20d166,
        timestamp: new Date(),
        description: `\`\`\`js\n${evaled}\n\`\`\``,
        fields: [{
          name: "Evaluation :",
          value: `\`\`\`js\n${beautify(code, { format: "js"})}\n\`\`\``,
          inline: false,
        },
        {
          name:"Type :" ,
          value: `${typeof(evaluer)}`, 
          inline: false,
        }
        ],
        footer: {
            text: client.user.username,
            icon_url: client.user.displayAvatarURL()
        }
    }
})


} catch (e) {
message.channel.send({
    embed: {
        title: "<a:error:773202660211163166> Erreur",
        color: 0xe71619,
        timestamp: new Date(),
        description: `\`\`\`js\n${e.stack}\`\`\``,
        footer: {
            text: client.user.username,
            icon_url: client.user.displayAvatarURL()
        }
    }
})

    }
    }
}

module.exports = Eval;