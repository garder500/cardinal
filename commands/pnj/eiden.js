const Command = require("../../base/Command.js"),
    Discord = require("discord.js"),
      fetch = require("node-fetch");
const { CanvasRenderService } = require('chartjs-node-canvas');
const Canvas = require('canvas'),
    canvacord = require("canvacord");

                  const talkedRecently = new Set();
const channelcomputing = new Set();
class eiden extends Command {

    constructor(client) {
        super(client, {
            name: "eiden",
            dirname: "pnj",
        });
    }

    async run(message, args, data, language) {
        let client = this.client

   const urimg = "https://tse2.mm.bing.net/th?id=OIP.PEdawC6mDu68l0bIThOwagHaNK&pid=Api&P=0&w=500&h=500"
    const pseudo = "Eiden (Princesse de l'abisse)"
             function msgsend(contenu,name,urlimage){
   if(message.guild.me.hasPermission("MANAGE_WEBHOOKS")){        
if(message.guild.me.hasPermission("MANAGE_NICKNAMES") || message.guild.me.hasPermission("CHANGE_NICKNAME")){
  message.guild.members.cache.get(client.user.id).setNickname(name)
}
            message.channel.startTyping();
            setTimeout(() => {          
         message.channel.fetchWebhooks().then(webhooks3=>{
        const webhook3 = webhooks3.filter(e => e.type === "Incoming").first();
        if(webhook3 === undefined){
           message.channel.createWebhook(name, {
    avatar: urlimage,
    reason: `Création de webhook par : ${message.author.tag}`
}).then(e => e.send(contenu , {
          username: name,
          avatarURL: urlimage,
         }) )
}else{
  webhook3.send(contenu , {
          username: name,
          avatarURL: urlimage,
         })
      }
})
if(message.guild.me.hasPermission("MANAGE_NICKNAMES") || message.guild.me.hasPermission("CHANGE_NICKNAME")){
  message.guild.members.cache.get(client.user.id).setNickname(client.user.username)
}
message.channel.stopTyping(true);
},(contenu.length*20))
          }else{
            if(message.guild.me.hasPermission("MANAGE_NICKNAMES") || message.guild.me.hasPermission("CHANGE_NICKNAME")){
  message.guild.members.cache.get(client.user.id).setNickname(name)
}
message.channel.startTyping();
                  setTimeout(() => {
      message.channel.send({
        embed:{
          title: name,
          thumbnail: {
          url: urlimage
          },
          description: contenu
        }
      })
      if(message.guild.me.hasPermission("MANAGE_NICKNAMES") || message.guild.me.hasPermission("CHANGE_NICKNAME")){ 
message.guild.members.cache.get(client.user.id).setNickname(client.user.username)
}
message.channel.stopTyping(true);
  },(contenu.length*20))
          }
     }
       if(talkedRecently.has(message.author.id)) return;
                  function suite(){
const regex = RegExp("[Ee]idd?(en|an)");
const filter = m => regex.test(m.content) && !m.author.bot;
const collector = message.channel.createMessageCollector(filter, { time: 8600000 });
     setTimeout(() => {
          // Removes the user from the set after a minute
          channelcomputing.delete(message.channel.id);
          talkedRecently.delete(message.author.id);
        },8600000);
collector.on('collect', m => {
fetch(`https://minria.fr/api/chatbot?message="${encodeURIComponent(m.content)}"&name=Eiden&gender=femmale&pseudo=${encodeURIComponent(m.author.username)}`).then(res => res.json()).then(json => {
    console.log(json)
  if(json.response === "undefined"){
              msgsend(`Je ne sais pas vraiment quoi répondre à ça...`,pseudo,urimg)
  }else{
          msgsend(`${json.response}`,pseudo,urimg)
  }
});
});
collector.on('end', collected => {
 msgsend(`Notre discussion est terminée jeune aventurier ! Tu pourras me réinvoquer dans 10 secondes !`,pseudo,urimg)
});
          }
       if(channelcomputing.has(message.channel.id)) return;
                 talkedRecently.add(message.author.id);
    channelcomputing.add(message.channel.id);
    msgsend(`Mhhh, j'ai été invoqué ? Où m'as-tu  invoqué ? *${pseudo} regarde les environs pour déterminer où vous l'aviez invoqué.*`,pseudo,urimg)
  setTimeout(() => {
            if(message.channel.name.toLowerCase().includes("auberge")){
               msgsend("Oh, bien ! Tu m'as invoqué dans l'auberge, que puis-je faire pour toi ?",pseudo,urimg)
            suite()
            }else{
                if(message.channel.parent.name.toLowerCase().includes("neutre")){
              setTimeout(() => {
                msgsend("Mhhh ? Tu m'invoque en dehors de l'auberge ?",pseudo,urimg)
                setTimeout(() => {
              msgsend("Je suppose que ce n'est pas la zone neutre ? *Elle zieuta rapidement*",pseudo,urimg)
                    setTimeout(() => {              
               msgsend("Ah si quand même ! Les aventurier ont un peu de bon sens !",pseudo,urimg)
               suite() 
                   },1000)
               },1000)                           
            },1000)
                }else{
                    setTimeout(() => {
                 msgsend(`Mhhh ? Tu m'invoque en dehors de l'auberge ?`,pseudo,urimg)
                setTimeout(() => {
                 msgsend(`Je suppose que ce n'est pas non plus la zone neutre... *En zieutant, elle ne vis aucune maison*`,pseudo,urimg)
                    setTimeout(() => {              
                 msgsend(`Et bien en effet ce n'est pas la zone neutre... Tu es bien imprudent pour t'occuper des dames dit moi...`,pseudo,urimg)
               suite() 
                   },1000)
               },1000)                           
            },1000)
                }
            }
        },1000)
    }
}

module.exports = eiden;